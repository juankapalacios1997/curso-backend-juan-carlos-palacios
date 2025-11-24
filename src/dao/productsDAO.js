import { productsModel } from "../models/products.model.js";

export class productsDAO {

    constructor(){}

    get() {
        return productsModel.find().lean();
    }

    getBy(filter={}) {
        return productsModel.findOne(filter).lean();
    }

    create(product) {
        return productsModel.create(product);
    }

    update(id, product, options = {}) {
        return productsModel.findByIdAndUpdate(id, product, options);
    }

    count() {
        return productsModel.countDocuments();
    }

};
