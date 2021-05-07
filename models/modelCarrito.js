const models = require('./schemas/schemaCarrito.js')

class modelCarrito{

    crearCarrito(producto){
        const carrito = {
            timestamp: Date.now(),
            productos: JSON.stringify(producto)
        }

        const crear = new models.Carritos(carrito)
        const guardar = crear.save()
        .then(resp => console.log(resp))
        .catch(e => console.log(e))

        return guardar
    }

    listarCarrito(){
        const listar = models.Carritos.find()
        .then(resp => {
            if(resp.length > 0){
                return resp
            }else{
                return {msj: 'No hay productos en el carrito'}
            }
        })
        .catch(e => console.log(e))

        return listar
    }


    borrarCarrito(id){
        const borrar = models.Carritos.deleteOne({_id: id})
            .then(resp => {
                if(resp.n > 0){
                    return {msj: 'Producto eliminado del carrito'}
                }else{
                    return {msj: 'Error al eliminar el producto'}
                }
            })
            .catch(e => console.log(e))

        return borrar
    }
}

module.exports = modelCarrito