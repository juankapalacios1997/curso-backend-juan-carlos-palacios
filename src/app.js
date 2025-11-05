import express, { response } from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import passport from 'passport';

import { initializePassport } from './config/passport.config.js';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import usersRouter from './routers/users.router.js';

import { ProductManager } from './managers/ProductManager.js';
import { UsersManager } from './managers/UsersManager.js';
import { CartsManager } from './managers/CartsManager.js';

const app = express();
const PORT = 8080;

mongoose.connect("mongodb+srv://jcmaster97_db_user:F9TseZ4AXvjoq1dY@testcluster.tq5mbma.mongodb.net/vinateria?appName=TestCluster");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

initializePassport();
app.use(passport.initialize());

app.use(express.static("./src/public"));


const httpServer = app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

const io = new Server(httpServer);

app.use('/products', productsRouter(io));
app.use('/carts', cartsRouter());
app.use('/users', usersRouter());

const productManager = new ProductManager(io);
const usersManager = new UsersManager();
const cartsManager = new CartsManager();

app.get('/', passport.authenticate("current", {
    session: false,
    failureRedirect: "/login"
}), async (req, res) => {
    const cartResponseObjPayload = (await cartsManager.fetchSingleCartByUserId(req.user?._id)).payload;

    const productsResponseObjPayload = (await productManager.fetchAllProducts()).payload;
    
    const productsToDisplay = [];
    
    cartResponseObjPayload?.products.forEach(product => {
        const productIndex = productsResponseObjPayload.findIndex(item => item?._id == product.id);

        if (productIndex < 0) return;

        productsToDisplay.push({ product: productsResponseObjPayload[productIndex], quantity: product.quantity });
    });

    res.render("index", { products: productsResponseObjPayload, cart: { id: cartResponseObjPayload?._id, products: productsToDisplay } });
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', async (req,res)=>{
    let { email, password }=req.body
    if(!email || !password) return res.status(400).send({ error:'Please type your email or password' })

    const user = await usersManager.fetchSingleUserByEmail(email);
    
    if(!user) return res.status(400).send({ error:`Wrong credentials` })
    
    if(!bcrypt.compareSync(password, user.password)) return res.status(400).send({ error:`Wrong credentials` });

    const plainUser = user.toObject();

    delete plainUser.password;

    let token = jwt.sign(plainUser, "LaGranBodega123", { expiresIn: "1h" })

    res.cookie("tokenCookie", token, { httpOnly: true });
    
    res.status(200)
        .redirect('/');
});

app.get("/logout", (req, res)=>{
    res.clearCookie("tokenCookie")
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({ payload:`Logout success` });
});

app.get('/user', passport.authenticate("current", {session: false, failureRedirect: "/error"}), (req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario '+ req.user.nombre,
    });
});

app.get('/new-user', (req, res) => {
    res.render("new-user");
});

app.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Oops! Contenido no disponible, intente mas tarde`, detalle: "Haga login...!!!"});
})

io.on("connection", async (socket) => {
    console.log("usuario conectado");
})

