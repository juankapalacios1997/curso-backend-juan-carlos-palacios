import { productsModel } from "../models/products.model.js";

export class ProductManager{
    constructor(io) {
        this.io = io;
    }

    async fetchAllProducts({ limit = 10, page = 1, sortPrice } = {}) {
        try {
            let query = productsModel.find().lean();

            if (sortPrice === "asc") {
                query = query.sort({ price: 1 });
            } else if (sortPrice === "desc") {
                query = query.sort({ price: -1 });
            }

            const totalDocs = await productsModel.countDocuments();

            let data;

            if (limit && Number.isInteger(limit) && limit > 0) {
                data = await query.limit(limit).skip((page - 1) * limit);
            } else {
                data = await query;
            }

            const totalPages = limit ? Math.ceil(totalDocs / limit) : 1;

            return {
                status: "success",
                payload: data,
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}${sortPrice ? `&sortPrice=${sortPrice}` : ""}` : null,
                nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}${sortPrice ? `&sortPrice=${sortPrice}` : ""}` : null,
            };

        } catch (error) {
            console.error(error);
            return {
                status: "error",
                payload: []
            };
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