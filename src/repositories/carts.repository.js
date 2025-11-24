import { cartsDAO } from "../dao/cartsDAO.js";

class CartsRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    getCarts() {
        return this.dao.get();
    }

    getCartsBy(filter) {
        return this.dao.getBy(filter);
    }

    createCart(cart) {
        return this.dao.create(cart);
    }

    updateCart(id, cart, options = {}) {
        return this.dao.update(id, cart, options);
    }

    deleteCart(id) {
        return this.dao.delete(id);
    }

}

const cartsRepository = new CartsRepository(cartsDAO);

export default cartsRepository;