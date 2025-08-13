const express = require('express');
const cors = require('cors');
const userRoutes = require('./routers/user.routes')
const viajeRoutes = require('./routers/viaje.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/viajes', viajeRoutes)

module.exports = app 