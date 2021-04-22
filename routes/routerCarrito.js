const express = require('express');
const Carrito = require('../controllers/classCarrito.js').Carrito
const listado = require('./routerProductos').listadoProductos
const routerCarrito = express.Router()

let listadoProductos = listado
let carritoCompras = []

/*
    * Endpoint Carrito
*/
const carrito = new Carrito(carritoCompras)

routerCarrito.get('/listar', (request, response, next) => {
    try {
        const itemID = request.query.id

        if(itemID){
            const item = carrito.listarCarritoPorID(itemID)
        
            if(item.msj === "Producto no encontrado"){
                //response.status(404)
                response.json(item)
            
            }else{
                response.status(200)
                response.json(item)
            }
            
        }else{
            const getAll = carrito.listarCarrito()

            getAll.then(resp => {
                response.status(200)
                response.json(resp)
            })

        }
        

    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
})

//Cargar productos al carrito
routerCarrito.post('/agregar', (request, response, next) => {
    try {

        const addCart = carrito.agregarAlCarrito(request.body)

        addCart.then(resp => {
            response.status(200)
            response.json(resp)
        })
        
        
    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
    
})

//Eliminar producto del carrito
routerCarrito.delete('/borrar/:id', (request, response, next) => {
    try {
        const borrar = carrito.borrarCarro(request.params.id)
        borrar.then(resp => {
            response.json(resp) 
        })
        
    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
    
})

module.exports = routerCarrito