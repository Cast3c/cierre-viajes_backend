const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routers/user.routes')
const viajeRoutes = require('./routers/viaje.routes')


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/viajes', viajeRoutes)

app.use(express.static(path.join(__dirname, '../dist')))

// app.get('*', (req,res)=> {
//     res.sendFile(path.join(__dirname, '../dist', 'index.html'))
// });

module.exports = app 