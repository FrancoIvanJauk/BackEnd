import query from './db.js'

const id = '6g82scnagUelbJMZAyiq'//escriba el id del producto a eliminar
const doc = query.doc(id)

try{
    const producto = await doc.delete()
    console.log('El producto eliminado fue', producto)

}catch(e){
    console.log(`Error${e.message}`)
}