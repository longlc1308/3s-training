const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            products: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amout: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
},
{ timestamps: true }
)

module.exports = mongoose.model("Oder", oderSchema)