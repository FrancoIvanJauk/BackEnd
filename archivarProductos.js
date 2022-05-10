const fs = require('fs')

module.exports = archivarProductos()

function archivarProductos(){
//Personas archivadas
const usuarios = [
  { categoria: 'pantalon', color: 'negro', id: 1 },
  { categoria: 'remera', color: 'blanco', id: 2 },
  { categoria: 'campera', color: 'azul', id: 3 }
]
//archivar usuarios
const usuarioStr = JSON.stringify(usuarios, null, 2)
 fs.promises.writeFile('./productos.txt', usuarioStr)
}