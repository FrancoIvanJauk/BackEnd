const fs = require('fs')

module.exports = archivarProductos()

function archivarProductos(){
//Personas archivadas
const productos = [
  { categoria: 'pantalon', color: 'negro', id: 1 },
  { categoria: 'remera', color: 'blanco', id: 2 },
  { categoria: 'campera', color: 'azul', id: 3 }
]

//archivar usuarios
const productoStr = JSON.stringify(productos, null, 2)
 fs.promises.writeFile('./productos.txt', productoStr)
}