import usersService from "../services/usersService.js";
import cartsRepository from "../repositories/carts.repository.js";
import { CartsService } from "../services/cartsService.js";
// import { CartsManager } from '../managers/CartsManager.js';

import bcrypt from "bcrypt";

// const cartsManager = new CartsManager(); //!Temporary

export async function getUsers(req, res) {
    let { payload } = await usersService.getUsers();

    res.status(200).json(payload);
}

export async function createUser(req, res) {
    const cartsService = new CartsService(cartsRepository);

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

    const savedUser = await usersService.createUser({
        ...user,
        password: bcrypt.hashSync(password, 10),
        role: user.role ?? "user",
    });

    const newCartForUser = await cartsService.createCart({
        user_id: savedUser._id,
    });

    await usersService.updateUser(savedUser._id, {
        cart_id: newCartForUser._id,
    });

    res.status(201).redirect('/login');
}