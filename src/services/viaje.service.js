const { generateId } = require('../utils/idGen')
const Viaje = require('../models/viaje.model')

const getAllViajes = async () => {
    return await Viaje.find();
}

const getViaje = async (id) => {
    return await Viaje.findById(id)
}

const createViaje = async (data) => {
    const _id = generateId(data);
    const viajeComplete = new Viaje({...data, _id});
    return await Viaje.create(viajeComplete)
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