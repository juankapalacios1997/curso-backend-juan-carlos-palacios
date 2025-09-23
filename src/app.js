import express, { response } from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

import { ProductManager } from './managers/ProductManager.js';

const app = express();
const PORT = 8080;

mongoose.connect("mongodb+srv://jcmaster97_db_user:F9TseZ4AXvjoq1dY@testcluster.tq5mbma.mongodb.net/vinateria?retryWrites=true&w=majority&appName=TestCluster");

app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

const httpServer = app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

const io = new Server(httpServer);

app.use('/products', productsRouter(io));
app.use('/carts', cartsRouter);

const productManager = new ProductManager(io);

app.get('/', async (req, res) => {
    const responseObj = await productManager.fetchAllProducts();

    const { payload } = responseObj;

    console.log(payload);

    res.render("index", { products: payload });
});

io.on("connection", async (socket) => {
    console.log("usuario conectado");
})

