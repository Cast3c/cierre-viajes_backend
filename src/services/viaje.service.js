const Viaje = require('../models/viaje.model')

const getAllViajes = async () => {
    return await Viaje.find();
}

const getViaje = async (id) => {
    return await Viaje.findById(id)
}

const createViaje = async (data) => {
    return await Viaje.create(data)
}

const updateViaje = async (id,data) => {
    return await Viaje.findByIdAndUpdate(id, data)
}

const deleteViaje = async (id) => {
    return await Viaje.findByIdAndDelete(id)
}
 
module.exports = { 
    getAllViajes,
    getViaje,
    createViaje,
    updateViaje, 
    deleteViaje
}