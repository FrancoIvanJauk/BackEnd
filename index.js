const express = require('express')
const fs = require('fs')
const app = express()

const PORT = 8080

const archivarProductos = require('./archivarProductos')
archivarProductos
const Contenedor = require('./funciones.js')
let funciones = new Contenedor('productos.txt')



app.get('/',(req, res)=>{

    res.send('Home')
})

app.get('/productos', async (req, res)=>{
    const productos = await funciones.getAll()

    res.send(productos)
})

app.get('/productoRandom', async (req, res)=>{
    const Productorandom = await funciones.productoRandom()

    res.send(Productorandom)
})

const server = app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

server.on('error',(error)=> console.log(`Error ${error}`))