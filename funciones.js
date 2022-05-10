const fs = require('fs')


class Contenedor{
    constructor(user){
      this.user = user
    }
    async read() {
      try {
          let data = await fs.promises.readFile( this.user, "utf-8")
          return data
          
      } catch (error) {
          throw Error("Error al leer el archivo")
      }
  }
  async write(datos, msg) {
    try {
        await fs.promises.writeFile("./" + this.user, JSON.stringify(datos, null, 2))
        console.log(msg)
    } catch (error) {
        throw Error("Error al escribir en el archivo")
    }
}

    async save(newUser) {
      let newId = 1
      let nuevoUsuario = {}
      let data = await this.read()
      let datos = JSON.parse(data)

      if(!data) {
        newUser.id = newId
        nuevoUsuario = [newUser]
    } else {
        newUser.id = datos[datos.length - 1].id + 1
        nuevoUsuario = newUser
    }
    datos.push(nuevoUsuario)

    await this.write(datos, "Usuario Agregado")
  }

  
    static getById(){
      const participante = usuarios.find((element) => {
       const buscarId = element.id === id
       return buscarId
     })
     if (participante === undefined){
       console.log(null)
     }else{
      console.log(participante) 
     }
    }


    async getAll(){
      fs.promises.readFile(this.user, 'utf-8')
      .then((participantesStr) => {
      const participantesObj = JSON.parse(participantesStr)
      console.log(participantesObj)
  })
    }


    static delateById(id){
      fs.readFile('./productos.txt', 'utf-8',(error, data)=>{
        if(error){
          console.log('Error al leer archivo')
        }else{
          const participantesObj = JSON.parse(data)
          const participante = participantesObj.filter((item)=> item.id !== id)
          const usuarioStr = JSON.stringify(participante, null, 2)
          fs.promises.writeFile('./Archivos.txt', usuarioStr)
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
    fs.readFile( this.user , 'utf-8',(error, data)=>{
        if(error){
          console.log('Error al leer archivo')
        }else{
          const productos = JSON.parse(data)
          const cantidad = productos.length
          const random = Math.floor(Math.random()*cantidad)+1;
          const productoRandom = productos.find((element) => {
            const buscarId = element.id === random
            return buscarId
          })
          if (productoRandom === undefined){
            console.log(null)
          }else{
           console.log(productoRandom)
          }
        }
      })

  }

}



const nuevoUsuario = new Contenedor('productos.txt')




// ejecutar funciones
async function ejecutarFunciones() {
  const newUsuario = {
    categoria: 'remera', color: 'rojo', id:[]
  }
  
  await nuevoUsuario.save(newUsuario)

  await Contenedor.getById(id=2)

  await Contenedor.getAll()

  setTimeout(function(){
    Contenedor.delateById(id=1)
  },2000)

  setTimeout(function(){
    Contenedor.deleteAll()
  },5000)

}

module.exports = Contenedor