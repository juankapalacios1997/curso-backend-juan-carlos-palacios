import express from 'express';
import { engine } from 'express-handlebars';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

app.get('/', (req, res) => {
    res.render("index");
});

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

