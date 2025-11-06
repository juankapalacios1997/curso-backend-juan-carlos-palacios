import { Router } from "express";
import { CartsManager } from '../managers/CartsManager.js';
import { authUser } from "../middleware/auth/auth.js";
import passport from "passport";

export default function cartsRouter(io) {
    const router = Router();
    const manager = new CartsManager(io);

    router.post('/', async(req, res) => {
        await manager.saveCart();
        res.status(201).json({ message: "Carrito creado con exito" });
    });

    router.get('/:id', async(req, res) => {
        const { id } = req.params;

        const cart = await manager.fetchSingleCart(id);
        res.json(cart); 
    });

    router.put('/:id', passport.authenticate("current", {
            session: false,
            failureRedirect: "/login",
    }), authUser, async(req, res) => {
        const { id } = req.params;

        const { pid } = req.body;

        if (!pid) {
            return res.status(404).json({ message: "Could not find product" });;
        }

        const response = await manager.updateCart(id, pid);

        res.status(201).json({ message: "Producto anadido al carrito correctamente", response });
    })

    return router;
}