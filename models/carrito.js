const {Schema, model, isObjectIdOrHexString} = require('mongoose')

//estructura del esquema
const cartSchema = new Schema({
    id: {type: String, required: true, max: 100},
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    imagen: {type: String, required: true, max: 100},
    precio: {type: String, required: true, max: 100},
    stock: {type: String, required: true, max: 100}
})

const cartModel = model('Carrito', cartSchema)

module.exports = cartModel