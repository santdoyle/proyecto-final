const {options} = require('../options/mariaDB.js')
const knex = require('knex')(options)

class modelCarrito{

    listarCarrito(){
        return knex('carrito').select()
            .then(resp => {
                if(resp.length > 0 ){
                    return resp
                    
                }else{
                    return {msj: 'No hay productos en el carrito'}
                }
                
            })
            .catch(e => e)
    }

    crearCarrito(producto){
        return knex('carrito').insert({
                timestamp: Date.now(),
                productos: JSON.stringify(producto)
            })
            .then(resp => {
                console.log(resp)
                if(resp == 1){
                    return {msj: 'El producto se agrego al carrito'}
                }else{
                    return {msj: 'Error al guardar el producto en el carrito'}
                }
            })
            .catch(e => e)
    }
    

    borrarCarrito(id){
        return knex('carrito').where('id', id).del()
            .then(resp => {
                if(resp == 1){
                    return {msj: 'Carrito eliminado correctamente'}
                }else{
                    return {msj: 'El carrito no puede ser eliminado'}
                }
            })
            .catch(e => e)
    }
}

module.exports = modelCarrito