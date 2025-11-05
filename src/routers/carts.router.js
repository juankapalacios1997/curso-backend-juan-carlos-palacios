import { Router } from "express";
import { CartsManager } from '../managers/CartsManager.js';
import { ProductManager } from "../managers/ProductManager.js";

export default function cartsRouter() {
    const router = Router();
    const manager = new CartsManager();

    const productManager = new ProductManager();

    router.post('/', async(req, res) => {
        await manager.createCart();
        res.status(201).json({ message: "Product added successfully" });
    });

    router.get('/:id', async(req, res) => {
        const { id } = req.params;

        const cart = await manager.fetchSingleCart(id);
        res.json(cart); 
    });

    router.put('/:id/product/:pid', async(req, res) => {
        const { id, pid } = req.params;

        if (!pid) {
            return res.status(404).json({ message: "Could not find product" });;
        }

        const response = await manager.updateCart(id, pid);

        res.status(201).json({ message: "Producto anadido al carrito correctamente", response });
    })

    return router;
}