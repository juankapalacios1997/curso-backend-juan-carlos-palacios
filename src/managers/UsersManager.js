import { usersModel } from "../models/users.model.js";

export class UsersManager {
    // constructor(io) {
    //     this.io = io;
    // }

    async fetchAllUsers() {
        try {
            let query = usersModel.find().lean();

            let data;

            data = await query;

            return {
                status: "success",
                payload: data,
            };

        } catch (error) {
            console.error(error);
            return {
                status: "error",
                payload: []
            };
        }
    }

    async fetchSingleUser(id) {
        try {
            const user = await usersModel.findById(id);

            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async fetchSingleUserByEmail(email) {
    try {
        return await usersModel.findOne({ email });
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

    async saveUser(user) {
        try {
            const newUser = await usersModel.create(user);

            return newUser;
        } catch(error) {
            console.error(error);
        }
    }

    async updateUser(id, product) {
        try {
            const updatedUser = await usersModel.findByIdAndUpdate(id, user);

            return updatedUser;
        } catch(error) {
            console.error(error);
        }
    }

    async deleteUser(id) {
        try {
            await usersModel.findByIdAndDelete(id);

        } catch(error) {
            console.error(error);
        }
    }
}