const models = require('./schemas/schemaProductos.js')
require('./connection.js')

class modelProductos{

    insertarProducto(prod){
        
        const data = new models.Productos(prod)
        const save = data.save((err, documment) => {
            if(err){
                console.log(err)
            }else{
                console.log('Insertado correctamente')
                console.log(documment)
            }
        })
        .then(resp => console.log(resp))
        .catch(e => console.log(e))

        return save
    }


    listarTodosLosProductos(){
        const getAll = models.Productos
            .find()
            .then(resp => {
                if(resp.length > 0){
                    return resp
                }else{
                    return {msj: 'No hay productos añadidos'}
                }
            })
        
            return getAll
    }


    listarProductoPorID(id){
        const getById = models.Productos.find({idProducto: id})

        return getById
    }


    actualizarProducto(p){
        console.log(typeof p.id)
        
        const update = models.Productos
            .updateOne(
                {"idProducto": p.id},
                {$set: 
                    {
                        "nombre" : p.nombre,
                        "descripcion": p.descripcion,
                        "codigo": p.codigo,
                        "imgUrl": p.imgUrl,
                        "precio": p.precio,
                        "stock": p.stock 
                    }
                }
            )
            .then(resp => console.log(resp))
            .catch(e => console.log(e))
        
            return update

    }

    borrarProducto(id){
        const borrar = models.Productos
            .deleteOne({idProducto: id})
            .then(resp => console.log(resp))
            .catch(e => console.log(e))

        return borrar   
    }
}
    
module.exports = modelProductos