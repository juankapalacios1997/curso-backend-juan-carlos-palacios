import { cartsModel } from "../models/carts.model.js";

export class cartsDAO {

    constructor(){}

    async get() {
        return await cartsModel.find().lean();
    }

    async getBy(filter={}) {
        return await cartsModel.findOne(filter).lean();
    }

    async create(cart) {
        return await cartsModel.create(cart);
    }

    async update(id, cart, options = {}) {
        return await cartsModel.findByIdAndUpdate(id, cart, options);
    }

};