import { Router } from "express";
import cartsRepository from "../repositories/carts.repository.js";
import { CartsService } from "../services/cartsService.js";

// import { CartsManager } from '../managers/CartsManager.js';
import { authUser } from "../middleware/auth/auth.js";
import passport from "passport";
import { saveCart, getCartById, updateCart } from "../controllers/cartsController.js";

export default function cartsRouter(io) {
    const router = Router();

    const cartsService = new CartsService(cartsRepository, io);

    router.post('/', saveCart(cartsService));

    router.get('/:id', getCartById(cartsService));

    router.put('/:id', passport.authenticate("current", {
            session: false,
            failureRedirect: "/login",
    }), authUser, updateCart(cartsService))

    return router;
}