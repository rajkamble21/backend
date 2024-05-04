const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors') ;

const app = express();
const PORT = 4000;

// Middleware to parse JSON in requests
app.use(express.json());
app.use(cors()); 

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/akart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Product Schema
const ProductSchema = new mongoose.Schema({
    customerName: String,
    product: String,
    quantity: Number,
    totalPrice: Number
});

// Product Model
const Product = mongoose.model("Product", ProductSchema);

// Route to save a new product
app.post('/products', async (req, res) => {
    try {
        const { customerName, product, quantity, totalPrice } = req.body;
        const newProduct = new Product({ customerName, product, quantity, totalPrice });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products from the database
        res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId); // Find product by ID in the database
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
