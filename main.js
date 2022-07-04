const db = require('./mongoDB')
const productModel = require('./models/productos')
const cartModel = require('./models/carrito')
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
            user
        }
        return res.render('index', data)

    }else{

        return res.redirect('/api/login')
    }

})


//MongoDB

    
    //Eliminar Producto
    app.post('/borrarProducto', (req, res)=>{
    
        const id = (req.body.borrarProductoId)
    
        db
          .then(_ => productModel.deleteOne({
            id: id
          }))
    
        return res.redirect('/')
        })
    
    
    //colocar producto para administradores
    app.post('/', (req, res)=>{
    
        async function agregar (){
            const numero = await productModel.find({}).count()
    
            id = numero
    
            const data = {
                id: id,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                imagen: req.body.imagen,
                precio: req.body.precio,
                stock: req.body.stock
            }
    
            const productos = new productModel(data)
    
            db
               .then(_ => productos.save())
               .then(doc => console.log(`producto guardado`, doc))
        
            return res.redirect('/')
    
        }
        agregar()
    
    })
    
    
    //lista de todos los productos
    app.get('/api/productos', (req, res)=>{
    
        if(user.length){
    
            async function prueba (){
                let nuevosProductos = await productModel.find({})
    
                const data = {
                    nuevosProductos
                }
    
                return res.render('productos', data)
            }
            prueba()
    
        }else{
    
            return res.redirect('/api/login')
        }
    
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
    
        const id = productoActualizado.id
     
        db
           .then(_ => productModel.updateOne({
            id: id
           },{
            $set: productoActualizado
           }))
    
        return res.redirect('/')
        })
    
    //Vista del carrito de compras
    app.get('/api/carrito', (req,res)=>{
    
        if(user.length){
    
            async function cart(){
                let carrito = await cartModel.find({})
    
                const data = {
                    carrito
                }
        
                return res.render('carrito', data)
            }
    cart()
    
        }else{
          
            return res.redirect('/api/login')
        }
    })
        
    
    //seleccionar productos para el carrito
    app.post('/api/productos/carrito', (req, res)=>{
        const product = {
            id: req.body.id
        }
    
        async function seleccion (){
            let nuevosProductos = await productModel.find({})
            const productoId = nuevosProductos.find(producto => producto.id === product.id)
    
            if (productoId === undefined){
                return res.redirect('/api/productos')
            }else{
                let product = {
                    id: productoId.id,
                    nombre: productoId.nombre,
                    descripcion: productoId.descripcion,
                    codigo: productoId.codigo,
                    imagen: productoId.imagen,
                    precio: productoId.precio,
                    stock: productoId.stock
                }
                const productCart = new cartModel(product)
    
                db
                   .then(_ => productCart.save())
                   .then(doc => console.log(`producto guardado en el carrito`, doc))
    
                return res.redirect('/api/productos')
            }
        
        }
        seleccion()
    })
    
    
    //borrar todo en el carro de compras
    app.post('/api/carrito', (req, res)=>{
    
        db
           .then(_ => cartModel.deleteMany())
    
        return res.redirect('/api/carrito')
    })
    
    //Eliminar Producto carrito
    app.post('/borrarProductoCarrito', (req, res)=>{
        const id = req.body.borrarProductoId
    
        db
          .then(_ => cartModel.deleteOne({
            id: id
            }))
        return res.redirect('/api/carrito')
    
        })
    
//Fin de MongoDB
    






const server = app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})


server.on('error',(error)=> console.log(`Error ${error}`))
