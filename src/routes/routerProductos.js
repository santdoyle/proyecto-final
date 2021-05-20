const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js').Productos
const routerProductos = express.Router()

//Variables globales
let administrador = true;
let listadoProductos = []
let carritoCompras = []

/*
    * Endpoint productos
*/

const productos = new Productos()
//Listar todos los productos
routerProductos.get('/listar', (request, response, next) => {
   
    try{            
        
        const getAll = productos.listarTodos(listadoProductos)
        getAll.then(resp => {
            response.render('index', {data: resp})
            //response.json(resp)
        })
        
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

//Listar producto por ID
routerProductos.get('/listar/:id', (request, response) => {
    if(request.params.id){
        const item = productos.listarProductosPorID(request.params.id, listadoProductos)

        item.then(resp => {
            console.log(resp)
            response.render('ficha', {data: resp})
            /*response.status(200).json(resp)*/
        })
    
    }
})

/*Vista publicar producto*/
routerProductos.get('/publicar', (request, response) => {
    response.render('publicarProducto')
})


//Endpoint publicar producto
let id = 0
routerProductos.post('/agregar', (request, response, next) => {
    
    try {
        if(administrador === true){
            productos.agregarProducto(request.body, id++, listadoProductos)
            response.redirect('/public/')
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

routerProductos.get('/editar/:id', (request, response) => {
    
    const item = productos.listarProductosPorID(request.params.id, listadoProductos)

        item.then(resp => {
            response.render('editar', {data: resp})
        })

})

//Actualizar producto por ID
routerProductos.put('/actualizar/:id', (request, response, next) => {
    
    try {
        if(administrador === true){
            const respuesta = productos.actualizarProducto(request.params.id, request.body)
            
            respuesta.then(resp => {
                response.redirect('/listar')
            })
                    
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
            let eliminado = productos.borrarProducto(request.params.id, listadoProductos)
            
            eliminado.then(resp => {
                response.json(resp.msj)
            })
            
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


routerProductos.get('/buscar/:key', (request, response) => {
    const key = request.params.key

    try {
        const item = productos.buscarPor(key)

        item.then(resp => {
            response.json(resp)
        })

    } catch (error) {
        console.log(error)
    }
})


module.exports = {routerProductos, listadoProductos}