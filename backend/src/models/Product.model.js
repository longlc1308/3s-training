const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    color: { type: Array },
    rom: { type: Array },
    ram: { type: String },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    sale: { type: Number, required: true },
    image: { type: String },
    inStock: { type: Boolean, default: true }
},
{ timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)