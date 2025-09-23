import { productsModel } from "../models/products.model.js";

export class ProductManager{
    constructor(io) {
        this.io = io;
    }

    async fetchAllProducts({limit = 10, page = 1, sortPrice}) {
        try {
            let query = productsModel.find().lean();

            if (sortPrice === "asc") {
                query = query.sort({ price: 1 });
            } else if (sortPrice === "desc") {
                query = query.sort({ price: -1 });
            }

            if (limit && Number.isInteger(limit) && limit > 0) {
                query.limit(limit).skip((page - 1) * limit);
            }

            const data = await query;

            return data;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async fetchSingleProduct(id) {
        try {
            const product = await productsModel.findById(id);

            return product;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async saveProduct(product) {
        try {
            const newProduct = await productsModel.create(product);

            this.io.emit("productAdded", newProduct);
            return newProduct;
        } catch(error) {
            console.error(error);
        }
    }

    async updateProduct(id, product) {
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(id, product);

            this.io.emit("productUpdated", updatedProduct);

            return updatedProduct;
        } catch(error) {
            console.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            await productsModel.findByIdAndDelete(id);

            this.io.emit("productDeleted", id);
        } catch(error) {
            console.error(error);
        }
    }
}