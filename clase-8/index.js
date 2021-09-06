import express from 'express';
import Producto from './modulos/producto.js'
import { v4 as uuidv4 } from 'uuid';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

let arrayProductos = [
    {
        title: "Juego de mesa T.E.G. Tradicional",
        price: 3850.50,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_659090-MLA44676313817_012021-O.webp",
        id: 1
    },
    {
        title: "Dungeon And Dragons 5e Monster Manual D&d Dnd 5ta Edición",
        price: 11275,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_726931-MLA45539678600_042021-O.webp",
        id: 2
    },
    {
        title: "Dados Dungeon & Dragons Rol Negro Pearl + Bolsa",
        price: 1297.97,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_632645-MLA40799082681_022020-O.webp",
        id: 3
    }
];

app.get('/api/productos/listar', (req, res) => {
    if (arrayProductos.length) {
        res.json(arrayProductos);
    } else {
        res.json({error: 'No hay productos cargados'})
    }
});

app.get('/api/productos/listar/:id', (req, res) => {
    let filteredArray = arrayProductos.filter(obj => { return obj.id == req.params.id });
    if (filteredArray.length) {
        res.json(filteredArray);
    } else {
        res.json({error: 'Producto no encontrado'})
    }
});

app.post('/api/productos/guardar/', (req, res) => {
    let body = req.body;
    let producto = new Producto(body.name,body.price,body.url,uuidv4());
    arrayProductos.push(producto.getParsedObject());
    res.json(producto);
});

/*
OBJETO PARA PRUEBA:
{
    "name": "Juego de mesa Carcassonne",
    "price": 5840,
    "url": "https://http2.mlstatic.com/D_NQ_NP_824823-MLA45578263264_042021-O.webp"
}
*/