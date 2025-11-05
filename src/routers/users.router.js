import { Router } from "express";
import { UsersManager } from '../managers/UsersManager.js';
import { CartsManager } from '../managers/CartsManager.js';
import bcrypt from "bcrypt";


export default function usersRouter() {
    const router = Router();
    const manager = new UsersManager();

    const cartsManager = new CartsManager();

    router.get('/', async(req, res) => {
        const { payload } = await manager.fetchAllUsers();
        res.json(payload); 
    });

    router.post('/', async(req, res) => {
        const user = req.body;

        const { 
            first_name,
            last_name,
            email,
            age,
            password,
        } = user;

        if (!first_name || !last_name || !email || !age || !password ) {
            return res.send('faltan datos');
        }

        const savedUser = await manager.saveUser({
            ...user,
            password: bcrypt.hashSync(password, 10),
            role: user.role ?? "user",
        });

        const newCartForUser = await cartsManager.saveCart({
            user_id: savedUser._id,
        });

        await manager.updateUser(savedUser._id, {
            cart_id: newCartForUser._id,
        });

        res.status(201).redirect('/login');
    });

    return router;
}