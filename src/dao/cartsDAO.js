import { cartsModel } from "../models/carts.model.js";

export class cartsDAO {

    constructor(){}

    get() {
        return cartsModel.find().lean();
    }

    getBy(filter={}) {
        return cartsModel.findOne(filter).lean();
    }

    create(cart) {
        return cartsModel.create(cart);
    }

    update(id, cart, options = {}) {
        return cartsModel.findByIdAndUpdate(id, cart, options);
    }

};