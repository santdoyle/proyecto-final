const express = require('express');
const App = express()
const path = require('path');
const Productos = require('./classProductos.js').Productos
const Carrito = require('./classCarrito.js').Carrito
const routerProductos = express.Router()
const routerCarrito = express.Router()
const routerPublico = express.Router()

App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use('/productos', routerProductos);
App.use('/carrito', routerCarrito)
App.use('/public', express.static('public'))

//Puerto 8080 para dev, process.env.PORT para produccion
const server = App.listen(8080, () => {
    console.log(`Servidor funcionando en ${server.address().port}`)
})

//Espacio publico
routerPublico.get('/public', (request, response) => {
    response.sendFile('/public/index.html')
    response.sendFile('/public/index.js')
    response.sendFile('/public/style.css')
})

//Variables globales
let administrador = true;
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
            response.redirect('/public/index.html')
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
    }
    
})


/*
    * Endpoint Carrito
*/
const carrito = new Carrito(carritoCompras)
routerCarrito.get('/listar', (request, response, next) => {
    try {
        const itemID = request.query.id

        if(itemID){
            const item = carrito.listarCarritoPorID(itemID)
        
            if(item === "Producto no encontrado"){
                response.status(404)
                response.json(item)
            
            }else{
                response.status(200)
                response.json(item)
            }
            
        }else{
            const getAll = carrito.listarCarrito()
            
            response.status(200)
            response.json(getAll)
        }
        

    } catch (error) {
        console.log(error)
    }
})

//Cargar productos al carrito
let idCarrito = 0
routerCarrito.post('/agregar', (request, response, next) => {
    try {
        
        const item = listadoProductos.find(elem => elem.id === request.body.id)
        const addItem = carrito.agregarAlCarrito(item, idCarrito++)

        carritoCompras.push(addItem)
        
        response.status(200)
        response.json(carritoCompras)
        
    } catch (error) {
        console.log(error)
    }
    
})

//Eliminar producto del carrito
routerCarrito.delete('/borrar/:id', (request, response, next) => {
    try {
        const carritoActualizado = carrito.borrarDelCarrito(request.params.id)
        carritoCompras = carritoActualizado

        response.json(carritoCompras)
    
    } catch (error) {
        console.log(error)
    }
    
})