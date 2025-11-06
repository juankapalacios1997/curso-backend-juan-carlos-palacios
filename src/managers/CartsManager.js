import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

export class CartsManager {
    constructor(io) {
        this.io = io;
    }

    async fetchSingleCart(id) {
        try {
            const cart = await cartsModel.findById(id).lean();

            return {
                status: "success",
                payload: cart,
            };
        } catch (error) {
            return [];
        }
    }

    async saveCart(cart) {
        try {
            const newCart = await cartsModel.create(cart);

            return newCart;
        } catch(error) {
            console.error(error);
        }
    }

    async fetchSingleCartByUserId(userId) {
        try {
            const cart = await cartsModel.findOne({ user_id: userId }).lean();

            return {
                status: "success",
                payload: cart,
            };
        } catch (error) {
            return [];
        }
    }

    async updateCart(id, pid) {     
        const { payload } = await this.fetchSingleCart(id);

        if (!payload) {
            throw new Error("Cannot find cart");
        }

        const toEditCartProducts = [...payload.products];

        const productIndex = toEditCartProducts.findIndex(item => item.id.toString() === pid);

        console.log(productIndex)

        if (productIndex < 0) {
            toEditCartProducts.push({ id: pid, quantity: 1 });
        } else {
            toEditCartProducts[productIndex].quantity++;
        }

        const updatedCart = await cartsModel.findByIdAndUpdate(
            id, 
            { products: [...toEditCartProducts] },
            { new: true }
        );

        const newCartProduct = await productsModel.findById(pid);

        this.io.emit("cartUpdated", {
            product: newCartProduct, 
            quantity: updatedCart.products.find(product => product.id.toString() === pid)?.quantity ?? 0,
        });

        return updatedCart;
    }
}