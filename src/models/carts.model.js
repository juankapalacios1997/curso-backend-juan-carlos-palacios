import mongoose from 'mongoose'

export const cartsModel = mongoose.model('carts', new mongoose.Schema({
    user_id: String,
    products: [
        {
            id: String,
            quantity: Number
        }
    ],
}, {timestamps: true}));