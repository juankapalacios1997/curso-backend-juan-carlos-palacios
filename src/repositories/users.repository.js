import { usersDAO } from "../dao/usersDAO.js";

class UsersRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    getUsers() {
        return this.dao.get();
    }

    getUsersBy(filter) {
        return this.dao.getBy(filter);
    }

    createUser(user) {
        return this.dao.create(user);
    }

    updateUser(id, user) {
        return this.dao.update(id, user);
    }

    deleteUser(id) {
        return this.dao.delete(id);
    }

}

const usersRepository = new UsersRepository(usersDAO);

export default usersRepository;