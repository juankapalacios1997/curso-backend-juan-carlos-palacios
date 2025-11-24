import productsRepository from "../repositories/products.repository.js";

export class ProductsService {
    constructor(dao, io) {
        this.productsRepository = dao;
        this.io = io;
    }

    async getProducts({ limit = 10, page = 1, sortPrice } = {}) {
        let query = productsRepository.getProducts();
        
        if (sortPrice === "asc") {
            query = query.sort({ price: 1 });
        } else if (sortPrice === "desc") {
            query = query.sort({ price: -1 });
        }

        const totalDocs = await productsRepository.countProducts();

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
    }

    async getProductsBy(filter) {
        return await productsRepository.getProductsBy(filter);
    }

    async createProduct(product) {
        return await productsRepository.createProduct(product)
    }

    async updateProduct(id, product) {
        const updatedProduct = await productsRepository.updateProduct(id, product);
        
        this.io.emit("productUpdated", updatedProduct);

        return updatedProduct;
    }

    async deleteProduct(id) {
        await this.productsRepository.deleteProduct(id);

        this.io.emit("productDeleted", id)
    }
}