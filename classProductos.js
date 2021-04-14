class Productos{
    arr = ""
    constructor(arr){
        this.arr = arr
    }

    listarTodos(){
        if(this.arr.length === 0){
            const msg = {"msg": "No hay productos añadidos"}

            return msg
        }
        return this.arr
    }
    
    listarProductosPorID(id){
        const listado = this.arr
        const idInt = parseInt(id)

        if(id > this.arr.length){
            throw new Error('Producto no encontrado')
        }

        const item = listado.find(elem => elem.id === idInt)
        
        return item
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

        return producto
    }

    actualizarProducto(id, data){
        if(id > this.arr.length){
            
            throw new Error('El producto indicado no existe')
        
        }else{
            const idInt = parseInt(id)
            
            let index = this.arr.findIndex(elem => elem.id === idInt)

            this.arr[index] = {
                id: idInt,
                timestamp: Date.now(),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                imgUrl: data.imgUrl,
                precio: data.precio,
                stock: data.stock
            }
    
            return this.arr
        }
    }

    borrarProducto(id){
        if(id > this.arr.length){
            
            return {"msg": "El producto indicado no existe"}
        
        }else{
            const idInt = parseInt(id)
            const index = this.arr.findIndex(el => el.id === idInt)
            
            this.arr.splice(index, 1)
            
            return {"msg": "Producto eliminado correctamente"}
        }
    }

}

module.exports.Productos = Productos