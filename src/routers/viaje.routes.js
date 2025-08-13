const express = require('express');
const { getViajes, createViaje, getViaje, updtViajeClientes, updtViajeGastos, dltViaje } = require('../controllers/viaje.controller')

const router = express.Router();

router.get('/', getViajes);
router.get('/:id', getViaje)
router.post('/', createViaje);
router.put('/:id/clientes', updtViajeClientes);
router.put('/:id/gastos', updtViajeGastos);
router.delete('/:id', dltViaje)

module.exports = router;