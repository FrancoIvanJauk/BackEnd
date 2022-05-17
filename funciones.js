const fs = require('fs')


class Contenedor{
    constructor(producto){
      this.producto = producto
    }

    async read() {
      try {
          let data = await fs.promises.readFile( this.producto, "utf-8")
          return data
          
      } catch (error) {
          throw Error("Error al leer el archivo")
      }
  }
  async write(datos, msg) {
    try {
        await fs.promises.writeFile("./" + this.producto, JSON.stringify(datos, null, 2))
        console.log(msg)
    } catch (error) {
        throw Error("Error al escribir en el archivo")
    }
}

    async save(newProduct) {
      let newId = 1
      let nuevoProducto = {}
      let data = await this.read()
      let datos = JSON.parse(data)

      if(!data) {
        newProduct.id = newId
        nuevoProducto = [newProduct]
    } else {
        newProduct.id = datos[datos.length - 1].id + 1
        nuevoProducto = newProduct
    }
    datos.push(nuevoProducto)

    await this.write(datos, "Producto Agregado")
  }

  async reemplazar(newProduct) {
    let nuevoProducto = {}
    let data = await this.read()
    let datos = JSON.parse(data)

    nuevoProducto = newProduct
    datos.push(nuevoProducto)

  await this.write(datos, "Producto Reemplazado")
}


    async getById(){
      const productos = await funciones.getAll()
      const ProductoObj = JSON.parse(productos)
      const producto = ProductoObj.find((element) => {
       const buscarId = element.id === id
       return buscarId
     })
     if (producto === undefined){
       console.log(null)
     }else{
      return producto
     }
    }


    async getAll(){
      const productos = await fs.promises.readFile(this.producto, 'utf-8')
 
       return productos
 
     }


    static delateById(id){
      fs.readFile('./productos.txt', 'utf-8',(error, data)=>{
        if(error){
          console.log('Error al leer archivo')
        }else{
          const ProductoObj = JSON.parse(data)
          const producto = ProductoObj.filter((item)=> item.id !== id)
          const productoStr = JSON.stringify(producto, null, 2)
          fs.promises.writeFile('./productos.txt', productoStr)
          console.log(`Se eliminó el id ${id}`)
        }
      })

  }


  static deleteAll(){
      fs.unlink('./Archivos.txt', error=>{
        if (error){
            console.log('error')
        }else{
            console.log('Archivo Borrado')
        }
    })
  }

  async productoRandom(){
    const productos = await fs.promises.readFile(this.producto, 'utf-8')
    const parse = JSON.parse(productos)
    const cantidad = parse.length
    const random = Math.floor(Math.random()*cantidad)+1;
    const productoRandom =  parse.find((element) => {
      const buscarId = element.id === random
      return buscarId
    })
    if (productoRandom === undefined){
      console.log(null)
    }else{
     return productoRandom
    }
  }

}



// const nuevoProducto = new Contenedor('productos.txt')


// ejecutar funciones
async function ejecutarFunciones() {
  // const newProduct = {
  //   categoria: 'remera', color: 'rojo', id:[]
  // }
  
  // await nuevoProducto.save(newProduct)

  // await Contenedor.getById(id=2)

  // await Contenedor.getAll()

  // setTimeout(function(){
  //   Contenedor.delateById(id=1)
  // },2000)

  // setTimeout(function(){
  //   Contenedor.deleteAll()
  // },5000)

}
// ejecutarFunciones()

module.exports = Contenedor