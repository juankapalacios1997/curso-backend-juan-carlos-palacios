import express from 'express';
import { engine } from 'express-handlebars';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

import { ProductManager } from './managers/ProductManager.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

const productManager = new ProductManager();

app.get('/', async (req, res) => {
    const products = await productManager.fetchAllProducts();

    res.render("index", { products });
});

app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

