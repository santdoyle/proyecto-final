const mongoose = require('mongoose')

const carritoCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    timestamp: {type: Number, required: true},
    productos: {type: String, required: true}
})

module.exports.Carritos = mongoose.model(carritoCollection, carritoSchema)