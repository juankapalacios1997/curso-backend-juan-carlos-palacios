import mongoose from 'mongoose'

export const cartsModel = mongoose.model('carts', new mongoose.Schema({
    id: String,
    name: String,
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