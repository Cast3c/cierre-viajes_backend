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
        const { id } = req.params

        // if(!id.match(/^\d{8}-[A-Z]{n}$/)){
        //     return res.status(400).json({ message: "ID inválido", id })
        // }

        const viaje = await viajeService.getViaje(id);

        if(!viaje){
            return res.status(404).json({ message: "Viaje no encontrado" })
        }

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
            { new: true }
        );
        res.status(200).json(viaje)
        console.log(viaje)
    }catch(error){
        res.status(204).json({ message: error.message })
    }
}

const updtViajeGastos = async (req, res) => {
    try{
        const viaje = await viajeService.updateViaje(
            req.params.id,
            { $set: {gastos: req.body}},
            { new: true }
        );
        res.status(200).json(viaje)
        
    }catch(error){
        res.status(204).json({ message: error.message })
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