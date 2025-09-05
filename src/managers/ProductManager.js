import fs from 'fs/promises';

const pathFile = './src/data/products.json';

export class ProductManager{
    constructor(io) {
        this.io = io;
    }

    async fetchAllProducts() {
        try {
            const data = await fs.readFile(pathFile, 'utf-8');

            const json = JSON.parse(data);

            return json;

        } catch (error) {
            return [];
        }
    }

    async fetchSingleProduct(id) {
        try {
            const data = await fs.readFile(pathFile, 'utf-8');
            const parsedData = JSON.parse(data);

            return parsedData.find(product => product.id === id);
        } catch (error) {
            return [];
        }
    }

    async saveProduct(product) {
        const products = await this.fetchAllProducts();
        product.id = `00${products.length + 1}`;
        products.push(product);

        await fs.writeFile(pathFile, JSON.stringify(products, null, 2));

        this.io.emit("productAdded", product);
        return product;
    }

    async updateProduct(id, product) {
        const products = await this.fetchAllProducts();

        const toEditProductIndex = products.findIndex(product => product.id === id);
        
        if (toEditProductIndex < 0) return;

        const toEditProduct = products[toEditProductIndex]

        for (const key in product) {
            toEditProduct[key] = product[key];
        }

        products[toEditProductIndex] = toEditProduct;

        await fs.writeFile(pathFile, JSON.stringify(products, null, 2));

        this.io.emit("productUpdated", {...product, id: id});
        return toEditProduct;
    }

    async deleteProduct(id) {
        const products = await this.fetchAllProducts();

        const filteredProducts = products.filter(product => product.id !== id);

        await fs.writeFile(pathFile, JSON.stringify(filteredProducts, null, 2));

        this.io.emit("productDeleted", id);
    }
}