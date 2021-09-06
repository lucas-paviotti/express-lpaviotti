import express from 'express';
import fs from 'fs';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

let visitasContador = {
    visitasItems: 0,
    visitasItemRandom: 0
}

app.get('/items', (req, res) => {
    visitasContador.visitasItems++;
    fs.promises.readFile('./archivos/productos.txt', 'utf-8').then(resultado => {
        let parsedJson = JSON.parse(resultado);
        res.send({
            items: parsedJson,
            cantidad: parsedJson.length
        });
    });
});

app.get('/item-random', (req, res) => {
    visitasContador.visitasItemRandom++;
    fs.promises.readFile('./archivos/productos.txt', 'utf-8').then(resultado => {
        let parsedJson = JSON.parse(resultado);
        let randomItem = parsedJson[Math.floor(Math.random() * parsedJson.length)]
        res.send({
            item: randomItem
        });
    });
});

app.get('/visitas', (req, res) => {
    res.send({
        visitas: {
            items: visitasContador.visitasItems,
            item: visitasContador.visitasItemRandom
        },
    });
});