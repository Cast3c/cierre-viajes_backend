const Viaje = require('./models/viaje')// Import the Viaje model
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
// const mongoose = require('mongoose')

// const password = process.argv[2]
// const url = `mongodb+srv://cast3c:${password}@cast3cnewmongodb.x0ednpa.mongodb.net/viajes?retryWrites=true&w=majority&appName=cast3cNewMongoDB`

// mongoose.set('strictQuery', false)

// mongoose.connect(url)

// const viajeSchema = new mongoose.Schema({
//     estado: String,
//     fecha: Date,
//     origen: String,
//     destino: String,
//     conductor: String,
//     vehiculo: String,
//     flete: Number
// })

// const Viaje = mongoose.model('Viaje', viajeSchema)

app.use(cors());// Esta línea permite que la API pueda recibir solicitudes desde otros dominios

app.use(express.static('dist'));// Esta línea permite que la API sirva archivos estáticos desde la carpeta 'dist'

app.use(express.json());//Este linea permite que la API pueda recibir datos en formato JSON

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', (req) => {
  return ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : ' ';
});

let viajes = [
  {
    id: "1",
    estado: "",
    fecha: "2025-05-01",
    origen: "Bogota",
    destino: "Bucaramanga",
    conductor: "Ricardo Castellar",
    placa: "TLZ834",
    flete: "2000000",
  },
  {
    id: "2",
    estado: "",
    fecha: "2025-05-02",
    origen: "Bogota",
    destino: "Bucaramanga",
    conductor: "Ricardo Castellar",
    placa: "TLZ834",
    flete: "2000000",
  },
  {
    id: "3",
    estado: "",
    fecha: "2025-05-22",
    origen: "Bogota ",
    destino: "Barrancabermeja",
    conductor: "Ricardo Castellar",
    placa: "TLZ834",
    flete: "3500000",
    clientes: [
      {
        nombre: "Ricardo ",
        telefono: "3132129686",
        origen: "Bogota ",
        destino: "Barrancabermeja",
        flete: "1800000",
      },
      {
        nombre: "Juan ",
        telefono: "3107888865",
        origen: "Barrancabermeja ",
        destino: "bucarmanga",
        flete: "500000",
      },
      {
        nombre: "Angie ",
        telefono: "3138716188",
        origen: "Bucarmanga",
        destino: "Bogota ",
        flete: "500000",
      },
      {
        nombre: "Cesar ",
        telefono: "1234567890",
        origen: "Bucaramanga",
        destino: "Bogota",
        flete: "700000",
      },
    ],
    gastos: {
      combustible: "600000",
      peajes: "250000",
      ayudantes: "250000",
      viaticos: "",
      comision: "700000",
    },
  },
];

const viajesLong = viajes.lenght

app.get('/', (request, response) => {
    response.json('Bienvenido a la API cierre de viajes')
})

app.get('/api/viajes/info', (request, response)=>{
    response.send(`
        <h1>API Cierre de Viajes</h1>
        <p>Esta API permite gestionar viajes, incluyendo la creación, consulta y eliminación de viajes.</p>
        <h2>Endpoints disponibles:</h2>
        <ul>
            <li><strong>GET /api/viajes</strong>: Obtiene todos los viajes.</li>
            <li><strong>GET /api/viajes/:id</strong>: Obtiene un viaje específico por ID.</li>
            <li><strong>POST /api/viajes</strong>: Crea un nuevo viaje.</li>
            <li><strong>DELETE /api/viajes/:id</strong>: Elimina un viaje por ID.</li>
        </ul>
        <h2>En este momento la base de datos registra ${viajes.length} viajes.</h2>
        <p>Para más información, consulta la documentación de la API.</p>
    `);         
})

app.get ('/api/viajes', (request, response) => {
  Viaje.find({}).then(viajes => {
    response.json(viajes)
  })
})

app.get('/api/viajes/:id', (request, response)=>{
    const id = request.params.id
    const viaje = viajes.find(viaje => viaje.id === id)

    if(viaje){
        response.json(viaje)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/viajes/:id', (request, response) => {
    const id = request.params.id
    viajes = viajes.filter(viaje => viaje.id !== id)

    response.status(204).end()
})

const generatedId = () => {
    const maxId = viajes.length > 0
        ? Math.max(...viajes.map(viaje => Number(viaje.id)))
        : 0;
    return String(maxId+1);
}

app.post('/api/viajes', (request, response) => {

    const body = request.body
    
    if(!body.origen && !body.destino){
        return response.status(400).json({
            error: 'El contenido del viaje es obligatorio'
        })
    }

    const viaje = {
        id: generatedId(),
        estado: body.estado || "planned",
        fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        origen: body.origen || "",
        destino: body.destino || "",
        conductor: body.conductor || "",
        placa: body.placa || "",
        flete: body.flete || ""
    }
    viajes = viajes.concat(viaje)
    
    response.json(viaje)
})

app.put('/api/viajes/:id', (request, response) => {
    const nuevoCliente = request.body
    const id = request.params.id
    const viaje = viajes.find(viaje => viaje.id === id)
    
    if(!nuevoCliente.clientes[0].nombre ){
        return response.status(400).json({})
    }

    viaje.clientes = viaje.clientes || [];

    viaje.clientes.push(nuevoCliente.clientes[0])
    
    console.log(viaje)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Endpoint desconocido' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})



