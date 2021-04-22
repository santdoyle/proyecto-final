const modelCarrito = require('../models/modelCarrito.js')

class Carrito{
    arr = ""
    
    constructor(arr){
        this.arr = arr
    }

    listarCarrito(){
        const carrito = new modelCarrito()
        const getAll = carrito.listarCarrito()

        return getAll
    }

    listarCarritoPorID(id){

        const idInt = parseInt(id)

        if(id > this.arr.length){
            return "Producto no encontrado"
        }

        const item = this.arr.find(elem => elem.id === idInt)
        return item
    }

    agregarAlCarrito(producto){
        
        const carrito = new modelCarrito()
        const nuevoCarrito = carrito.crearCarrito(producto)

        return nuevoCarrito
    }


    borrarCarro(id){
        const carrito = new modelCarrito()
        const borrar = carrito.borrarCarrito(id)
        
        return borrar
    }
}

module.exports.Carrito = Carrito