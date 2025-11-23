import usersRepository from "../repositories/users.repository.js";

class UsersService {
    constructor(dao) {
        this.usersRepository = dao;
    }

    async getUsers() {
        return await this.usersRepository.getUsers();
    }

    async getUsersBy(filter) {
        return await this.usersRepository.getUsersBy(filter);
    }

    async createUser(user) {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(id, user) {
        return await this.usersRepository.updateUser(id, user);
    }

    async deleteUser(id) {
        return await this.usersRepository.deleteUser(id);
    }
}

const usersService = new UsersService(usersRepository);

export default usersService;