import mongoose from 'mongoose'

export const productsModel = mongoose.model('products', new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
}, {timestamps: true}));