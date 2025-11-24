import { usersModel } from "../models/users.model.js";

export class usersDAO {

    constructor(){}

    get() {
        return usersModel.find().lean();
    }

    getBy(filter={}) {
        return usersModel.findOne(filter).lean();
    }

    create(user) {
        return usersModel.create(user);
    }

    update(id, user) {
        return usersModel.findByIdAndUpdate(id, user);
    }

    delete(id) {
        return usersModel.findByIdAndDelete(id);
    }
};