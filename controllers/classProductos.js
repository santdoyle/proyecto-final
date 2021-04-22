const modelProductos = require('../models/modelProductos.js')

class Productos{
    arr = ""
    constructor(arr){
        this.arr = arr
    }

    listarTodos(){
        /*if(this.arr.length === 0){
            const error = {msg: "No hay productos añadidos"}

            return error.msg
        }*/

        const db = new modelProductos()
        const lista = db.listarTodosLosProductos()     
        
        return lista
    }
    
    listarProductosPorID(id){
        //const listado = this.arr
        //const idInt = parseInt(id)

        /*if(id > this.arr.length){
            throw new Error('Producto no encontrado')
        }*/

        const db = new modelProductos()
        const p = db.listarProductoPorID(id)
        
        return p
        
    }

    agregarProducto(data, id){

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

        const insert = new modelProductos()
        const insertado = insert.insertarProducto(producto)
        
        return insertado
    }

    
    actualizarProducto(id, data){
        const idInt = parseInt(id)
            
        const p = {
            id: idInt,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        }

        const db = new modelProductos()
        const actualizar = db.actualizarProducto(p)
    
        return actualizar
        
    }

    borrarProducto(id){
        const db = new modelProductos()
        const borrar = db.borrarProducto(id)
        
        return borrar
    }

}

module.exports.Productos = Productos