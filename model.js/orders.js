const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    customerName: String,
    product: String,
    quantity: Number,
    totalPrice: Number
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
