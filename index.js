const express = require('express')
const archivarProductos = require('./archivarProductos')
const Contenedor = require('./funciones')
archivarProductos
const app = express()

const PORT = 8080



app.get('/',(req, res)=>{
    res.send('<h1> Home </h1>')
})

app.get('/productos',(req, res)=>{
    let funciones = new Contenedor('productos.txt')
    funciones.getAll()
    res.send(`<h2>Productos</h2>`)
})

app.get('/productoRandom',(req, res)=>{
    let funciones = new Contenedor('productos.txt')
    funciones.productoRandom()
    res.send('<h2>Producto random</h2>')
})

const server = app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

server.on('error',(error)=> console.log(`Error ${error}`))