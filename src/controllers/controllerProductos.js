const persistencia = require('./controllerPersistencia.js')

class Productos{

    listarTodos(productos){
        
        const listaDeProductos = persistencia.getAll(productos)

        return Promise.resolve(listaDeProductos)
    }
    
    listarProductosPorID(id, productos){
        
        const listaDeProductos = persistencia.getOne(id, productos)

        return Promise.resolve(listaDeProductos)
    }

    agregarProducto(data, id, productos){
        
        let producto = {
            id: id++,
            idProducto: id++,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        }
        
        const listaDeProductos = persistencia.addOne(producto)

        return Promise.resolve(listaDeProductos)

    }

    
    actualizarProducto(id, data){
        let productos = []
            
        const listaDeProductos = persistencia.updateOne(id, data)
        
        return Promise.resolve(listaDeProductos)
        
        
    }

    borrarProducto(id, productos){
        const listaDeProductos = persistencia.deleteOne(id)
            
        return Promise.resolve(listaDeProductos)
    }

    buscarPor(key){
        const listaDeProductos = persistencia.searchBy(key)
            
        return Promise.resolve(listaDeProductos)
    }

    ordenarPor(key){
        const listaDeProductos = persistencia.orderBy(key)

        return Promise.resolve(listaDeProductos)
    }

}

module.exports.Productos = Productos