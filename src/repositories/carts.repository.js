import { cartsDAO } from "../dao/cartsDAO.js";

class CartsRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    async getCarts() {
        return await this.dao.get();
    }

    async getCartsBy(filter) {
        return await this.dao.getBy(filter);
    }

    async createCart(cart) {
        return await this.dao.create(cart);
    }

    async updateCart(id, cart, options = {}) {
        return await this.dao.update(id, cart, options);
    }

    async deleteCart(id) {
        return await this.dao.delete(id);
    }

}

const cartsRepository = new CartsRepository(cartsDAO);

export default cartsRepository;