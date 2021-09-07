import express from 'express';
import Producto from './modulos/producto.js'
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 8080;
const routerApi = express.Router()

app.use(express.json());
app.use('/api', routerApi);

app.use(express.static('public'));

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

routerApi.get('/productos/listar', (req, res) => {
    if (arrayProductos.length) {
        res.status(200).json(arrayProductos);
    } else {
        res.status(404).json({error: 'No hay productos cargados'})
    }
});

routerApi.get('/productos/listar/:id', (req, res) => {
    let { id } = req.params;
    let filteredArray = arrayProductos.find(obj => obj.id == id);
    if (filteredArray) {
        res.status(200).json(filteredArray);
    } else {
        res.status(404).json({error: 'Producto no encontrado'})
    }
});

routerApi.post('/productos/guardar/', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let producto = new Producto(title,price,thumbnail,uuidv4());
    arrayProductos.push(producto.getParsedObject());
    res.status(200).json(producto);
});

routerApi.put('/productos/actualizar/:id', (req, res) => {
    let { id } = req.params;
    let { title, price, thumbnail } = req.body;
    let productoEditado = arrayProductos.find(obj => obj.id == id);
    if (productoEditado) {
        productoEditado.title = title, productoEditado.price = price, productoEditado.thumbnail = thumbnail;
        res.status(200).json(productoEditado);
    } else {
        res.status(404).json({error: 'Producto no encontrado'});
    }
});

routerApi.delete('/productos/borrar/:id', (req, res) => {
    let { id } = req.params;
    let removeFromArray = arrayProductos.find(obj => obj.id == id);
    arrayProductos.splice(removeFromArray, 1);
    res.json(removeFromArray);
});

/*
OBJETO PARA PRUEBA:
{
    "title": "Juego de mesa Carcassonne",
    "price": 5840,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_824823-MLA45578263264_042021-O.webp"
}
*/