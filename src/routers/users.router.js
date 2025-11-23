import { Router } from "express";
// import { UsersManager } from '../managers/UsersManager.js';
import { getUsers, createUser } from "../controllers/usersController.js";
import { CartsManager } from '../managers/CartsManager.js';
// import bcrypt from "bcrypt";


export default function usersRouter() {
    const router = Router();
    // const manager = new UsersManager();

    // const cartsManager = new CartsManager();

    router.get('/', getUsers);

    router.post('/', createUser);

    return router;
}