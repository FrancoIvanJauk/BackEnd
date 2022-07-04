import query from './db.js'

try{
    const docs = await query.get()
    const products = docs.docs.map(doc =>{
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    console.log('Los productos son', products)

}catch(e){
    console.log(`Error${e.message}`)
}