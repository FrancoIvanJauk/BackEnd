import query from './db.js'

const id = '6g82scnagUelbJMZAyiq'//Id ejemplo 6g82scnagUelbJMZAyiq
const doc = query.doc(id)
console.log(doc)
try{
    const product = await doc.update({
        nombre: 'pantalon',
        descripcion: 'Descripcion',
        codigo: 'uas5',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_814606-MLA48728191053_012022-O.webp',
        precio: 4000,
        stock: 20
    })

}catch(e){
    console.log(`Error${e.message}`)
}