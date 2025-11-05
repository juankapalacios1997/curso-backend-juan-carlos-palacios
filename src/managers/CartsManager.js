import { cartsModel } from "../models/carts.model.js";

export class CartsManager {
    async fetchSingleCart(id) {
        try {
            const cart = await cartsModel.findById(id);

            return cart;
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
            const cart = await cartsModel.findOne({ user_id: userId });

            return cart;
        } catch (error) {
            return [];
        }
    }

    async updateCart(id, product) {       
        const toEditCart = await this.fetchSingleCart(id);

        if (!toEditCart) {
            throw new Error("Cannot find cart");
        }

        const productIndex = toEditCart.products.findIndex(item => item.id === product.id);

        if (productIndex >= 0) {
            toEditCart.products[productIndex].quantity++;
        } else {
            toEditCart.products.push({...product, quantity: 1});
        }

        await cartsModel.findByIdAndUpdate(id, toEditCart);

        return toEditCart;
    }
}