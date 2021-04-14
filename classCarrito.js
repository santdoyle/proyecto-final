class Carrito{
    arr = ""
    
    constructor(arr){
        this.arr = arr
    }

    listarCarrito(){
        if(this.arr.length === 0){
            return "No hay productos en el carro"
        }

        return this.arr
    }

    listarCarritoPorID(id){

        const idInt = parseInt(id)

        if(id > this.arr.length){
            return "Producto no encontrado"
        }

        const item = this.arr.find(elem => elem.id === idInt)
        return item
    }

    agregarAlCarrito(item, id_carrito){

        let listadoEnCarrito = {
            id: id_carrito,
            timestamp: Date.now(),
            producto: []
        }

        listadoEnCarrito.producto.push(item)

        return listadoEnCarrito
    }


    borrarDelCarrito(id){
        const idInt = parseInt(id)
        const index = this.arr.findIndex(el => el.id === idInt)
        
        this.arr.splice(index, 1)
        
        return this.arr
    }
}

module.exports.Carrito = Carrito