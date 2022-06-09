const express = require('express')

const app = express()

const PORT = 8080

//para recibir formato json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'ejs')



//Usuarios, para entrar como administrador poner en login el nombre "admin"
let user = []
//Productos
let nuevosProductos = [
    {
        id: 1,
        nombre: 'Producto 1',
        descripcion: 'Descripción del producto',
        codigo: 'jkdf56',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_814606-MLA48728191053_012022-O.webp',
        precio: '5000',
        stock: 15
      },  {
        id: 2,
        nombre: 'Producto 2',
        descripcion: 'Descripción del producto',
        codigo: 'jkdf536',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_814606-MLA48728191053_012022-O.webp',
        precio: '4000',
        stock: 25
      },  {
        id: 3,
        nombre: 'Producto 3',
        descripcion: 'Descripción del producto',
        codigo: 'jkf546',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_814606-MLA48728191053_012022-O.webp',
        precio: '2000',
        stock: 45
      }
]
//Carrito de compras
let carrito = []


//form del logeo
app.get('/api/login', (req,res)=>{

    if(user.length){
        return res.redirect('/')
    }else{
        const data = {
            user
        }

        return res.render('login', data)
    }

})

//datos del logeo
app.post('/api/login', (req, res)=>{

    const nombre = {
        nombre: req.body.login
    }

    user.push(nombre)

    return res.redirect('/')
})

//home
app.get('/', (req, res)=>{
    if (user.length){

        const data = { 
            nuevosProductos,
            user
        }
        return res.render('index', data)

    }else{

        return res.redirect('/api/login')
    }

})

//Eliminar Producto
app.post('/borrarProducto', (req, res)=>{

    const id = Number(req.body.borrarProductoId)
    let productos = nuevosProductos.filter((prod)=> prod.id !== id)
    nuevosProductos = productos

    return res.redirect('/')
    })


//colocar producto para administradores
app.post('/', (req, res)=>{
let id = nuevosProductos.length + 1
    const producto = {
        id: id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        imagen: req.body.imagen,
        precio: req.body.precio,
        stock: req.body.stock
    }

     nuevosProductos.push(producto)

    return res.redirect('/')
})


//lista de todos los productos
app.get('/api/productos', (req, res)=>{

    if(user.length){
        const data = {
            nuevosProductos
        }

        return res.render('productos', data)

    }else{

        return res.redirect('/api/login')
    }

})

//producto segun id indicado en el url
app.get('/api/productos/:id',(req, res)=>{
    const productos = nuevosProductos
    
    const id = Number(req.params.id)
    const productoId = productos.find(producto => producto.id === id)
    
    if(!productoId){
        return res.status(404).json({
            error: 'Producto no encontrado' 
        })
    }

    return res.send(productoId)
})

//actualizar producto
app.post('/actualizacion', (req, res)=>{

    const productoActualizado = {
        id: Number(req.body.id),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        imagen: req.body.imagen,
        precio: req.body.precio,
        stock: req.body.stock
    }
    

    const productos = nuevosProductos
    const id = productoActualizado.id
    const productoIndex = productos.findIndex(producto => producto.id === id)

    if(productoIndex === -1){
       console.log('Producto no encontrado, intente con otro id')
        return res.redirect('/')
    }

    productos[productoIndex].nombre = productoActualizado.nombre
    productos[productoIndex].descripcion = productoActualizado.descripcion
    productos[productoIndex].codigo = productoActualizado.codigo
    productos[productoIndex].imagen = productoActualizado.imagen
    productos[productoIndex].precio = productoActualizado.precio
    productos[productoIndex].stock = productoActualizado.stock

    return res.redirect('/')
    })

    
//info de productos seleccionados para el carrito
app.post('/api/productos/carrito', (req, res)=>{
    const productos = nuevosProductos
    const product = {
        id: Number(req.body.id)
    }
    const productoId = productos.find(producto => producto.id === product.id)
 
    if (productoId === undefined){
        return res.redirect('/api/productos')
    }else{
        carrito.push(productoId)
    }

    return res.redirect('/api/productos')
})

//carro de compras
app.get('/api/carrito', (req,res)=>{

    if(user.length){
        const data = {
            carrito
        }

        return res.render('carrito', data)
    }else{
      
        return res.redirect('/api/login')
    }

})


//borrar todo
app.post('/api/carrito', (req, res)=>{

    carrito = []

    return res.redirect('/api/carrito')
})

//Eliminar Producto carrito
app.post('/borrarProductoCarrito', (req, res)=>{

    const id = Number(req.body.borrarProductoId)
    let productos = carrito.filter((prod)=> prod.id !== id)
    carrito = productos

    return res.redirect('/api/carrito')
    })




const server = app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

server.on('error',(error)=> console.log(`Error ${error}`))
