const express = require('express')

const app = express()

const PORT = 8080

//Router
const {Router} = express
const productosRuter = Router()
app.use('/api/productos', productosRuter)


//llamar a la funcion que escribe los datos de productos.txt
// const archivarProductos = require('./archivarProductos')
// archivarProductos

//llamada al Contenedor de las funciones
const Contenedor = require('./funciones.js')
let funciones = new Contenedor('productos.txt')

//para recibir formato json
productosRuter.use(express.json())
productosRuter.use(express.urlencoded({ extended: true }))


//Static
productosRuter.use('/form',express.static(__dirname + '/public'))


productosRuter.get('', async (req, res)=>{
    const productos = await funciones.getAll()

    res.send(productos)
})


productosRuter.get('/:id',async(req, res)=>{
    const productos = await funciones.getAll()
    const ProductoObj = JSON.parse(productos)
    const id = Number(req.params.id)
    const productoId = ProductoObj.find(producto => producto.id === id)

    if(!productoId){
        return res.status(404).json({
            error: 'Producto no encontrado' 
        })
    }

    return res.send(productoId)
})


productosRuter.get('/calcular/productoRandom', async (req, res)=>{
    const Productorandom = await funciones.productoRandom()

    res.send(Productorandom)
})


productosRuter.post('', async (req, res)=>{
    const nuevoProducto = req.body
    console.log(nuevoProducto)
    await funciones.save(nuevoProducto)

    return res.status(201).json(nuevoProducto)
})


productosRuter.put('/:id',async(req, res)=>{

    const productos = await funciones.getAll()
    const ProductoObj = JSON.parse(productos)
    const idParams = Number(req.params.id)

    const productoIndex = ProductoObj.findIndex(producto => producto.id === idParams)
    
    if(productoIndex === -1){
        return res.status(404).json({
            error: 'Producto no encontrado' 
        })
    }
    Contenedor.delateById(id = idParams)

    const body = req.body

    ProductoObj[productoIndex].categoria = body.categoria
    ProductoObj[productoIndex].color = body.color

    setTimeout(async function(){
        await funciones.reemplazar(ProductoObj[productoIndex])
    },100)

    return res.json(ProductoObj[productoIndex])
})


productosRuter.delete('/:id',async (req, res)=>{

    const productos = await funciones.getAll()
    const ProductoObj = JSON.parse(productos)
    const idParams = Number(req.params.id)

    const productoIndex = ProductoObj.findIndex(producto => producto.id === idParams)
    
    if(productoIndex === -1){
        return res.status(404).json({
            error: 'Producto no encontrado' 
        })
    }
    Contenedor.delateById(id = idParams)

    return res.status(204).json({})
})




const server = app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

server.on('error',(error)=> console.log(`Error ${error}`))