import { productsModel } from "../models/products.model.js";

export class ProductManager{
    constructor(io) {
        this.io = io;
    }

    async fetchAllProducts() {
        try {
            const data = await productsModel.find().lean();

            return data;

        } catch (error) {
            return [];
        }
    }

    async fetchSingleProduct(id) {
        try {
            const product = await productsModel.findById(id);

            return product;
        } catch (error) {
            return [];
        }
    }

    async saveProduct(product) {
        const newProduct = await productsModel.create(product);

        this.io.emit("productAdded", newProduct);
        return newProduct;
    }

    async updateProduct(id, product) {
        const updatedProduct = await productsModel.findByIdAndUpdate(id, product);

        this.io.emit("productUpdated", updatedProduct);

        return updatedProduct;
    }

    async deleteProduct(id) {
        await productsModel.findByIdAndDelete(id);

        this.io.emit("productDeleted", id);
    }
}