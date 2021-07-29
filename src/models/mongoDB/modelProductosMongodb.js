const models = require('./schemas/schemaProductos.js')

class modelProductosMongodb{
    static instancia
    
    constructor(connection) {
        if(!!modelProductosMongodb.instancia){
            return modelProductosMongodb.instancia
        }

        modelProductosMongodb.instancia = this
        this.connection = connection

    }

    connectionDB(c){
        if(c === 3){
            return require('./connectionLocal.js')
        }else{
            return require('./connectionSAS.js')
        }
    }

    addOne(prod){
        this.connectionDB(this.connection)

        const data = new models.Productos(prod)
        const save = data.save((err, documment) => {
            if(err){
                console.log(err)
            }else{
                console.log('Insertado correctamente')
                console.log(documment)
            }
        })
        .catch(e => console.log(e))

        return save
    }


    getAll(){
        this.connectionDB(this.connection)
        
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


    getOne(id){

        this.connectionDB(this.connection)
        const getById = models.Productos.find({"_id": id})
        
        return getById
    }


    updateOne(id, data){
        this.connectionDB(this.connection)

        const update = models.Productos
            .updateOne(
                {"idProducto": id},
                {$set: 
                    {
                        "nombre" : data.nombre,
                        "descripcion": data.descripcion,
                        "codigo": data.codigo,
                        "imgUrl": data.imgUrl,
                        "precio": data.precio,
                        "stock": data.stock 
                    }
                }
            )
            .then(resp => console.log(resp))
            .catch(e => console.log(e))
        
            return update

    }

    deleteOne(id){
        this.connectionDB(this.connection)

        const borrar = models.Productos
            .deleteOne({idProducto: id})
            .then(resp => {
                if(resp.ok === 1){
                    return {msj: "Producto eliminado correctamente"}
                }
            })
            .catch(e => console.log(e))
        
        return borrar   
    }

    searchBy(key){
        this.connectionDB(this.connection)

        const buscar = models.Productos.find({"nombre": key})
        .then(resp => {
            if(resp.length > 0){
                return resp
            }else{
                return {msj: "No hay productos con ese nombre"}
            }
        })
        .catch(e => console.log(e))

        return buscar
    }

    orderBy(key){
        this.connectionDB(this.connection)

        const ordenar = models.Productos.find({}).sort({key: -1})
         .then(resp => {
            if(resp.length > 0){
                return resp
            }else{
                return {msj: "No hay productos con ese nombre"}
            }
         })
         .catch(e => console.log(e))

         return ordenar
    }
}
    
module.exports = modelProductosMongodb