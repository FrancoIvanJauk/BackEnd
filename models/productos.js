const {Schema, model} = require('mongoose')

//estructura del esquema
const productSchema = new Schema({
    id: {type: String, required: true, max: 100},
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    imagen: {type: String, required: true, max: 100},
    precio: {type: String, required: true, max: 100},
    stock: {type: String, required: true, max: 100}
})

const productModel = model('Productos', productSchema)

module.exports = productModel