import { Router } from "express";
import { CartsManager } from '../managers/CartsManager.js';
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();
const manager = new CartsManager();

const productManager = new ProductManager();

router.get('/', async(req, res) => {
    const carts = await manager.fetchAllCarts();
    res.json(carts); 
});

router.post('/', async(req, res) => {
    await manager.createCart();
    res.status(201).json({ message: "Product added successfully" });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    const cart = await manager.fetchSingleCart(id);
    res.json(cart); 
});

router.post('/:id/product/:pid', async(req, res) => {
    const { id, pid } = req.params;

    const addedProduct = await productManager.fetchSingleProduct(pid);

    if (!addedProduct) {
        return res.status(404).json({ message: "Could not find product" });;
    }

    const product = await manager.updateCart(id, addedProduct);

    res.status(201).json({ message: "Product getted successfully", product });
})

export default router;