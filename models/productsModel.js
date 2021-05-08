const express = require('express')
const faker = require('faker')

class productosModel{

    generarMultiples(num){
        let cantidad = num

        if(cantidad == 0){
            return {msj: "No hay productos disponibles"}
        
        }else if(cantidad == undefined){
            cantidad = 10
        
        }else{
            cantidad = num
        }

        const productos = []
        let producto = {
            nombre: "",
            precio: "",
            descripcion: "",
            foto: ""
        }

        for (let i = 1; i <= cantidad; i++) {
            producto = {
                nombre: faker.commerce.productName(),
                precio: faker.commerce.price(),
                descripcion: faker.commerce.productDescription(),
                foto: faker.image.image()
            }
            
            productos.push(producto)
        }

        return productos
        
    }

}

module.exports = productosModel
