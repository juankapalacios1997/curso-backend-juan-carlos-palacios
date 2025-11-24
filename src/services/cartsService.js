import cartsRepository from "../repositories/carts.repository.js";
import { productsModel } from "../models/products.model.js";

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

        const toEditCartProducts = [...res.products];

        const productIndex = toEditCartProducts.findIndex(item => item.id.toString() === pid);

        if (productIndex < 0) {
            toEditCartProducts.push({ id: pid, quantity: 1 });
        } else {
            toEditCartProducts[productIndex].quantity++;
        }

        const updatedCart = await cartsRepository.updateCart(
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

    async deleteCart(id) {
        return await this.cartsRepository.deleteCart(id);
    }
}

// const cartsService = new CartsService(cartsRepository);
// export default cartsService;