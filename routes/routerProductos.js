const express = require('express');
const Productos = require('../controllers/classProductos.js').Productos
const routerProductos = express.Router()

//Variables globales
let administrador = true;
let error = {}
let listadoProductos = []
let carritoCompras = []

/*
    * Endpoint productos
*/
const productos = new Productos(listadoProductos)

//Listar productos
routerProductos.get('/listar', (request, response, next) => {
    try {
        if(request.query.id){
        
            const item = productos.listarProductosPorID(request.query.id)
            response.status(200)
            response.json(item)
        
        }else{
            
            const getAll = productos.listarTodos()
            response.send(getAll)
        }

    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
})


//Añadir producto
let id = 0
routerProductos.post('/agregar', (request, response, next) => {
    
    try {
        if(administrador === true){
            const addProducto = productos.agregarProducto(request.body, id++)
            listadoProductos.push(addProducto)
            
            //response.status(200)
            response.redirect('/public/')
            //response.json(`Producto agregado. Cantidad: ${listadoProductos.length}`)
            
        }else{
            const error = {
                    error: "-1",
                    descripcion: '/productos/agregar POST no autorizado'
            }
            
            response.status(401)
            response.json(error)
        }
    
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})

//Actualizar producto por ID
routerProductos.put('/actualizar/:id', (request, response, next) => {
    try {
        if(administrador === true){
            const respuesta = productos.actualizarProducto(request.params.id, request.body)
            listadoProductos = respuesta

            response.status(200)
            response.json('Producto actualizado correctamente')
        
        }else{
            const error = {
                error: "-1",
                descripcion: '/productos/actualizar PUT no autorizado'
            }
        
            response.status(401)
            response.json(error)
        }
    
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})

//Eliminar producto por ID
routerProductos.delete('/borrar/:id', (request, response, next) => {
    
    try {
        if(administrador === true){
            let eliminado = productos.borrarProducto(request.params.id)
            listadoProductos = eliminado
            
            response.status(200)
            response.json(eliminado)
        }else{
            const error = {
                error: "-1",
                descripcion: '/productos/borrar DELETE no autorizado'
            }
        
            response.status(401)
            response.json(error)
        }
        
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})


module.exports = {routerProductos, listadoProductos}