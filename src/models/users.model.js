import mongoose from 'mongoose'

export const usersModel = mongoose.model('users', new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart_id: String,
    role: String,
}, {timestamps: true}));