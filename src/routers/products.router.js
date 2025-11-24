import { Router } from "express";
import { ProductManager } from '../managers/ProductManager.js';
import { authAdmin } from "../middleware/auth/auth.js";
import passport from "passport";

import { ProductsService } from "../services/productsService.js";
import productsRepository from "../repositories/products.repository.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

export default function productsRouter(io) {
    const router = Router();
    
    const productsService = new ProductsService(productsRepository, io);

    router.get('/', getProducts(productsService));

    router.get('/:id', getProductById(productsService));

    router.post('/', passport.authenticate("current", {
        session: false,
        failureRedirect: "/login",
    }), authAdmin, createProduct(productsService));

    router.put('/:id', authAdmin, updateProduct(productsService));

    router.delete('/:id', deleteProduct(productsService));

    return router;
}