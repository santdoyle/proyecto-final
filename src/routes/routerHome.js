const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js').Productos
const listado = require('./routerProductos.js').listadoProductos
const routerHome = express.Router()

routerHome.get('/', (request, response) => {
    try{            
        const productos = new Productos()
        const getAll = productos.listarTodos(listado)
        
        getAll.then(resp => {
            response.render('index', {data: resp})
        })
        
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

module.exports = routerHome