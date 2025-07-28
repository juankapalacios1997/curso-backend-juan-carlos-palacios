import { Router } from "express";
import { ProductManager } from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async(req, res) => {
    const products = await manager.fetchAllProducts();
    res.json(products); 
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    const product = await manager.fetchSingleProduct(id);
    res.json(product); 
});

router.post('/', async(req, res) => {
    const product = req.body;

    const { title, description, code, price, status, stock, category, thumbnails } = product;

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.send('faltan datos');
    }

    await manager.saveProduct(product);
    res.status(201).json({ message: "Product added successfully", product });
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const product = req.body;

    await manager.updateProduct(id, product);
    res.status(201).json({ message: "Product edited successfully", product });
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    await manager.deleteProduct(id);
    res.status(204).json({ message: "Product deleted successfully" });
});

export default router;