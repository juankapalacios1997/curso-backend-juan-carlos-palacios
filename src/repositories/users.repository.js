import { usersDAO } from "../dao/usersDAO.js";

class UsersRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    async getUsers() {
        return await this.dao.get();
    }

    async getUsersBy(filter) {
        return await this.dao.getBy(filter);
    }

    async createUser(user) {
        return await this.dao.create(user);
    }

    async updateUser(id, user) {
        return await this.dao.update(id, user);
    }

    async deleteUser(id) {
        return await this.dao.delete(id);
    }

}

const usersRepository = new UsersRepository(usersDAO);

export default usersRepository;