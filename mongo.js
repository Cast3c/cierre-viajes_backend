const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://cast3c:${password}@cast3cnewmongodb.x0ednpa.mongodb.net/viajes?retryWrites=true&w=majority&appName=cast3cNewMongoDB`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const viajeSchema = new mongoose.Schema({
    estado: String,
    fecha: Date,
    origen: String,
    destino: String,
    conductor: String,
    vehiculo: String,
    flete: Number
})

const Viaje = mongoose.model('Viaje', viajeSchema)

// const viaje = new Viaje({
//     estado: 'completado',
//     fecha: new Date(),
//     origen: 'Bogota',
//     destino: 'Medellin',
//     conductor: 'Juan Perez',
//     vehiculo: 'ABC123',
//     flete: 1500000
// })

// viaje.save().then(result => {
//     console.log('Viaje saved!')
//     mongoose.connection.close()
// })

Viaje.find({ estado: 'completado' }).then(result => {
    result.forEach( viaje => {
        console.log(viaje)
    });
    mongoose.connection.close()
})

