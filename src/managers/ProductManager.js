import fs from 'fs/promises';

const pathFile = './src/data/products.json';

export class ProductManager{
    async fetchAllProducts() {
        try {
            const data = await fs.readFile(pathFile, 'utf-8');

            return JSON.parse(data);
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
        return product;
    }

    async updateProduct(id, product) {
        const products = await this.fetchAllProducts();

        const toEditProductIndex = products.findIndex(product => product.id === id);

        console.log(toEditProductIndex);
        
        if (toEditProductIndex < 0) return;

        const toEditProduct = products[toEditProductIndex]

        for (const key in product) {
            toEditProduct[key] = product[key];
        }

        products[toEditProductIndex] = toEditProduct;

        console.log(products[toEditProduct]);

        await fs.writeFile(pathFile, JSON.stringify(products, null, 2));
        return toEditProduct;
    }

    async deleteProduct(id) {
        const products = await this.fetchAllProducts();

        const filteredProducts = products.filter(product => product.id !== id);

        console.log(filteredProducts);

        await fs.writeFile(pathFile, JSON.stringify(filteredProducts, null, 2));
    }
}