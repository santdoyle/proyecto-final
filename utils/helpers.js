const config = require('../models/config.js')

function setConfig(persistencia, productos){
    const setDB = new config()
    
    if(persistencia == 0){
        const db = setDB.enmemoria(productos)

        return db
         
    }else if(persistencia == 2){
        const db = setDB.mariadb()

        return db
    }
}

module.exports = setConfig