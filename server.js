const express = require('express');
const App = express()
const path = require('path')
const routerProductos = require('./src/routes/routerProductos.js').routerProductos
const routerCarrito = require('./src/routes/routerCarrito.js')
const routerHome = require('./src/routes/routerHome.js')

App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use('/productos', routerProductos);
App.use('/carrito', routerCarrito)
App.use('/', routerHome)
App.use('/tienda', express.static('public'))
App.set('view engine', 'ejs')
App.set('views', path.join(__dirname + '/src/views'))

//Puerto 8080 para dev, process.env.PORT para produccion
const server = App.listen(3030, () => {
    console.log(`Servidor funcionando en ${server.address().port}`)
})

