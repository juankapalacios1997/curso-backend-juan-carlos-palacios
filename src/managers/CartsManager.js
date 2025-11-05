import { cartsModel } from "../models/carts.model.js";

export class CartsManager {
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

        const toEditCartProducts = payload.products;

        const productIndex = toEditCartProducts.findIndex(item => item.id === pid);

        if (productIndex >= 0) {
            toEditCartProducts[productIndex].quantity++;
        } else {
            toEditCartProducts.push({ id: pid, quantity: 1 });
        }

        const updatedCart = await cartsModel.findByIdAndUpdate(id, {
            products: [...toEditCartProducts],
        });

        return updatedCart;
    }
}