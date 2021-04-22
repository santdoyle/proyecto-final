const {options} = require('../options/mariaDB.js')
const knex = require('knex')(options)

class modelProductos{

    //Guardar producto en DB
    insertarProducto(producto){
        knex('productos').insert({
            id: producto.id,
            timestamp: producto.timestamp,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            imgUrl: producto.imgUrl,
            precio: producto.precio,
            stock: producto.stock
        })
        .then((resp) => {
            if(resp == 1){
                return {msj: 'Producto guardado correctamente'}
            }else{
                return {msj: 'Ocurrio un error. Volvé a intentarlo'}
            }
        })
        .catch(e => {console.log(e); throw e})
        
        
    }

    //Seleccionar todos los Productos en DB
    listarTodosLosProductos(){
        let data = []
        return knex.select().from('productos')
            .then((resp) => {
                for (const item of resp) {
                    data.push(item)
                }

                return data
            })
            .catch(e => console.log(e))
    }

    //Seleccionar un solo producto en DB
    listarProductoPorID(id){
        
        return knex.from('productos').select().where('id', id)
            .then((resp) => {
                return resp
            })
        .catch(e => console.log(e))
    }

    //Borrar un producto
    borrarProducto(id){
        return knex.from('productos').where('id', id).del()
            .then(resp => {
                if(resp == 1){
                    return {msj: 'El producto fue eliminado correctamente'}
                }else{
                    return {msj: 'El producto no se encuentra'}
                }
            })
            .catch(e => e)
    }

    //Actualizar un producto en DB
    actualizarProducto(producto){

        knex.from('productos').where('id', producto.id).update({
            id: producto.id,
            timestamp: producto.timestamp,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            imgUrl: producto.imgUrl,
            precio: producto.precio,
            stock: producto.stock
        })
        .then(resp => {
            if(resp == 1){
                return {msj: 'Producto actualizado correctamente'}
            }else{
                return {msj: 'Error al actualizar el producto'}
            }
        })
        .catch(e => e)

    }
}

module.exports = modelProductos