import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Servidor funcionando en puerto ${PORT}`);
});

app.listen((PORT), () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

