import mongoose from 'mongoose'

export const cartsModel = mongoose.model('carts', new mongoose.Schema({
    user_id: String,
    products: [
        {
            _id: false,              // ✅ this disables the auto-generated _id
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
}, {timestamps: true}));