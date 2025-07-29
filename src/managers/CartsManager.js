import fs from 'fs/promises';

const pathFile = './src/data/carts.json';

export class CartsManager{
    async fetchAllCarts() {
        try {
            const data = await fs.readFile(pathFile, 'utf-8');

            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async fetchSingleCart(id) {
        try {
            const data = await fs.readFile(pathFile, 'utf-8');
            const { carts } = JSON.parse(data);

            return carts.find(product => product.id === id);
        } catch (error) {
            return [];
        }
    }

    async createCart() {
        const data = await this.fetchAllCarts();

        console.log(typeof data.carts, "data");
        
        const newCart = {
            id: `01${data.carts.length + 1}`,
            products: [],
        }

        data.carts.push(newCart);

        await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
        return newCart;
    }

    async updateCart(id, product) {       
        const toEditCart = await this.fetchSingleCart(id);

        if (!toEditCart) {
            throw new Error("Cannot find cart");
        }

        const productIndex = toEditCart.products.findIndex(item => item.id === product.id);

        if (productIndex >= 0) {
            toEditCart.products[productIndex].quantity++;
        } else {
            toEditCart.products.push({...product, quantity: 1});
        }


        const { carts } = await this.fetchAllCarts();

        if (!carts.length) {
            throw new Error("Cannot find cart");
        }

        const cartIndex = carts.findIndex(cart => cart.id === id);
        carts[cartIndex] = toEditCart;

        const newObject = {
            carts: carts
        }
        await fs.writeFile(pathFile, JSON.stringify(newObject, null, 2));

        return newObject;
    }
}