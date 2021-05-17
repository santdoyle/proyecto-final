const modelMemoria = require("./enMemoria/modelProductosMemoria");
const modelProductosMariaDB = require('./mariaDB/modelProductosMariaDB.js')
const modelProductoSqlite = require('./SQLite/modelProductosSQLite.js')
const modelProductosMongodb = require('./mongoDB/modelProductosMongodb.js')

class persistencia{

    enmemoria(p){
        return new modelMemoria(p)
    }

    mariadb(){
        return new modelProductosMariaDB()
    }

    sqlite(){
        return new modelProductoSqlite()
    }  
    
    mongodb(persistencia){
        return new modelProductosMongodb(persistencia)
    }

}

module.exports = persistencia

/*module.exports = {
    enmemoria: (p) => new modelMemoria(p),
    mariadb: (p) => new modelProductosMariaDB(p)
}*/