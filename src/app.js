import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Servidor funcionando en puerto ${PORT}`);
});

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

