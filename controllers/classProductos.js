const productosModel = require('../models/productsModel.js')

class Productos{

    generarProductosFaker(num){
        
        const generar = new productosModel()
        const maximoDiez = generar.generarMultiples(num)

        return maximoDiez
    }

}

module.exports.Productos = Productos