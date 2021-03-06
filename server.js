const express = require('express');
const App = express()
const routerProductos = require('./routes/routerProductos.js').routerProductos
const routerCarrito = require('./routes/routerCarrito.js')
const routerPublico = require('./routes/routerPublico.js')

App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use('/productos', routerProductos);
App.use('/carrito', routerCarrito)
App.use('/tienda', express.static('public'))

//Puerto 8080 para dev, process.env.PORT para produccion
const server = App.listen(3030, () => {
    console.log(`Servidor funcionando en ${server.address().port}`)
})