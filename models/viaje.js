const mongoose = require('mongoose')
// const password = process.argv[2]
// ``
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI 

console.log('Connecting to', url)
mongoose.connect(url)
    .then(result => { 
        console.log('Connected to MongoDB')
    })
    .catch(error=> {
        console.log('error connecting to MongoDB:', error.message)
    })

const viajeSchema = new mongoose.Schema({
    estado: String,
    fecha: Date,
    origen: String,
    destino: String,
    conductor: String,
    vehiculo: String,
    flete: Number
})


module.exports = mongoose.model('Viaje', viajeSchema)