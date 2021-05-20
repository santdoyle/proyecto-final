const mongoose = require('mongoose')

const url = ''
let rpta =  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    console.log('Error: ' + err)
})

console.log('Connected')

/*const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connected error'))
db.once('open', () => {
    
})*/