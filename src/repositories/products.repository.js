import { productsDAO } from "../dao/productsDAO.js";

class ProductsRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    getProducts() {
        console.log(this.dao.get(), "repo")
        return this.dao.get();
    }

    getProductsBy(filter) {
        return this.dao.getBy(filter);
    }

    createProduct(product) {
        return this.dao.create(product);
    }

    updateProduct(id, product, options = {}) {
        return this.dao.update(id, product, options);
    }

    deleteProduct(id) {
        return this.dao.delete(id);
    }

    countProducts() {
        return this.dao.count();
    }

}

const productsRepository = new ProductsRepository(productsDAO);

export default productsRepository;