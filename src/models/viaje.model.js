const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const viajeSchema = new mongoose.Schema({
    _id: String,
    estado: String,
    fecha: Date,
    origen: String,
    destino: String,
    conductor: String,
    vehiculo: String,
    flete: Number,
    clientes: [],
    gastos:[]
})

module.exports = mongoose.model('Viaje', viajeSchema)