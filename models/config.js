const modelMemoria = require("./enMemoria/modelProductosMemoria");
const modelProductosMariaDB = require('./mariaDB/modelProductosMariaDB.js')

class persistencia{

    enmemoria(p){

        return new modelMemoria(p)
    }

    mariadb(){
        return new modelProductosMariaDB()
    }

}

module.exports = persistencia

/*module.exports = {
    enmemoria: (p) => new modelMemoria(p),
    mariadb: (p) => new modelProductosMariaDB(p)
}*/