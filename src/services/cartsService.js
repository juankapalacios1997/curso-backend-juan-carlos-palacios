import cartsRepository from "../repositories/carts.repository.js";
import { productsModel } from "../models/products.model.js";

import { CartProductsDTO } from "../dto/cartProductsDTO.js";

export class CartsService {
    constructor(dao, io) {
        this.cartsRepository = dao;
        this.productsModel = productsModel;
        this.io = io;
    }

    async getCarts() {
        return await this.cartsRepository.getCarts();
    }

    async getCartsBy(filter) {
        return await this.cartsRepository.getCartsBy(filter);
    }

    async createCart(cart) {
        return await this.cartsRepository.createCart(cart);
    }

    async updateCart(id, pid) {
        const res = await this.cartsRepository.getCartsBy({ _id: id });
        
        if (!res) {
            throw new Error("Cannot find cart");
        }

        const toEditCartProducts = new CartProductsDTO(res);

        const productIndex = toEditCartProducts.products.findIndex(item => item.id.toString() === pid);

        if (productIndex < 0) {
            toEditCartProducts.products.push({ id: pid, quantity: 1 });
        } else {
            toEditCartProducts.products[productIndex].quantity++;
        }

        const updatedCart = await cartsRepository.updateCart(
            id, 
            // { products: [...toEditCartProducts] },
            toEditCartProducts,
            { new: true }
        );

        const newCartProduct = await productsModel.findById(pid);

        this.io.emit("cartUpdated", {
            product: newCartProduct,
            quantity: updatedCart.products.find(product => product.id.toString() === pid)?.quantity ?? 0,
        });

        return updatedCart;
    }

    async deleteCart(id) {
        return await this.cartsRepository.deleteCart(id);
    }
}