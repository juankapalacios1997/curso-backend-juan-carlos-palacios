import mongoose from 'mongoose'

export const cartsModel = mongoose.model('carts', new mongoose.Schema({
    products: [
        {
            title: String,
            description: String,
            price: Number,
            stock: Number,
            quantity: Number
        }
    ]
}, {timestamps: true}));