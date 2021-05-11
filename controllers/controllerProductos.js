const modelMemoria = require('../models/enMemoria/modelProductosMemoria.js')
const setConfig = require('../utils/helpers.js')

const persistencia = 2

class Productos{

    listarTodos(productos){
        
        const db = setConfig(persistencia, productos)
        const listaDeProductos = db.getAll()

        return Promise.resolve(listaDeProductos)
    }
    
    listarProductosPorID(id, productos){
        
        const db = setConfig(persistencia, productos)
        const listaDeProductos = db.getOne(id)
        
        return Promise.resolve(listaDeProductos)
    }

    agregarProducto(data, id, productos){
        
        let producto = {
            id: id++,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        }
        
        const db = setConfig(persistencia, productos)
        const listaDeProductos = db.addOne(producto)

        return Promise.resolve(listaDeProductos)

    }

    
    actualizarProducto(id, data){
        if(id > this.arr.length){
            
            throw new Error('El producto indicado no existe')
        
        }else{
            
            const db = setConfig(persistencia, productos)
            const listaDeProductos = db.updateOne(id, data)
            
            return Promise.resolve(listaDeProductos)

        }
    }

    borrarProducto(id){
        const enMemoria = new modelMemoria(productos)
        const listaDeProductos = enMemoria.deleteOne(id, data)
            
        return Promise.resolve(listaDeProductos)
    }

}

module.exports.Productos = Productos