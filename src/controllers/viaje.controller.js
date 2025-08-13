const viajeService = require('../services/viaje.service');

const getViajes = async (req, res) => {
    try{
        const viajes = await viajeService.getAllViajes();
        res.json(viajes)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const getViaje = async (req, res) => {
    try{
        const viaje = await viajeService.getViaje(req.params.id);
        res.json(viaje)
    }catch(error){
        res.status(500).json( {message: error.message })
    }
}

const createViaje = async (req, res) => {
    try{
        const viaje = await viajeService.createViaje(req.body);
        res.status(201).json(viaje)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const updtViajeClientes = async (req, res) => {
    try{
        const viaje = await viajeService.updateViaje(
            req.params.id,
            {$push: {clientes: req.body}},
            { new: true}
        );
        res.status(201).json(viaje)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const updtViajeGastos = async (req, res) => {
    try{
        const viaje = await viajeService.updateViaje(
            req.params.id,
            {gastos: req.body},
        );
        res.status(201).json(viaje)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const dltViaje = async (req, res) => {
    try{
        const viaje = await viajeService.deleteViaje(req.params.id);
        res.json(viaje)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}



module.exports = { getViajes, getViaje, createViaje, updtViajeClientes, updtViajeGastos, dltViaje }