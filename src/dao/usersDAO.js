import { usersModel } from "../models/users.model.js";

export class usersDAO {

    constructor(){}

    async get() {
        return await usersModel.find().lean();
    }

    async getBy(filter={}) {
        return await usersModel.findOne(filter).lean();
    }

    async create(user) {
        return await usersModel.create(user);
    }

    async update(id, user) {
        return await usersModel.findByIdAndUpdate(id, user);
    }

    async delete(id) {
        return await usersModel.findByIdAndDelete(id);
    }
};