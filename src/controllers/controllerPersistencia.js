const modelMemoria = require("../models/enMemoria/modelProductosMemoria");
const modelProductosMariaDB = require('../models/mariaDB/modelProductosMariaDB.js')
const modelProductoSqlite = require('../models/SQLite/modelProductosSQLite.js')
const modelProductosMongodb = require('../models/mongoDB/modelProductosMongodb.js')

let option = process.argv[2] || 4

class controllerPersistencia{
    static setPersist(option){
        switch(option){
            case 0: return new modelMemoria();
            case 2: return new modelProductosMariaDB()
            case 3: return new modelProductosMongodb(option)
            case 4: return new modelProductoSqlite()
            case 6: return new modelProductosMongodb(option)
        }
    }
}

module.exports = controllerPersistencia.setPersist(option)