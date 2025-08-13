require('dotenv').config();
const connectDB = require('./src/config/mongo')
const app = require('./src/app')

//Conecta a la base de datos 
connectDB()

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
