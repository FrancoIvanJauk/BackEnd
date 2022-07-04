import query from "./db.js";

try{
    const docs = await query.get()
    const product = docs.docs.map(doc =>{
        return{
            id: doc.id,
            ...doc.data()
        }
    })

    let id = ++ product.length

    const productos = await query.add({
        id: id,
        nombre: 'Remera',
        descripcion: 'Descripcion',
        codigo: 'uio5',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_814606-MLA48728191053_012022-O.webp',
        precio: 3000,
        stock: 15
    })

}catch(e){
    console.log(`Error${e.message}`)
}