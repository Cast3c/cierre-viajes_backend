require('dotenv').config()
const { generateId } = require('./src/utils/idGen')

const express = require('express');
const Viaje = require('./src/models/viaje.model')// Import the Viaje model

const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());// Esta línea permite que la API pueda recibir solicitudes desde otros dominios

app.use(express.static('dist'));// Esta línea permite que la API sirva archivos estáticos desde la carpeta 'dist'

app.use(express.json());//Este linea permite que la API pueda recibir datos en formato JSON

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', (req) => {
  return ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : ' ';
});

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
    // const viaje = viajes.find(viaje => viaje.id === id)
    Viaje.findById(id).then((viaje) => {
      console.log(viaje)
      if (viaje) {
        response.json(viaje);
      } else {
        response.status(404).end();
      }
    });
})

app.delete('/api/viajes/:id', (request, response) => {
    const id = request.params.id
    viajes = viajes.filter(viaje => viaje.id !== id)

    response.status(204).end()
})

app.post('/api/viajes', (request, response) => {

    const body = request.body
    
    if(!body.origen && !body.destino){
        return response.status(400).json({
            error: 'El contenido del viaje es obligatorio'
        })
    }

    const id = generateId(body)

    const viaje = new Viaje({
        _id: id,
        estado: body.estado || "planned",
        fecha: new Date(), // Fecha actual en formato YYYY-MM-DD
        origen: body.origen || "",
        destino: body.destino || "",
        conductor: body.conductor || "",
        vehiculo: body.placa || "",
        flete: body.flete || ""
    })
    
    viaje.save().then(savedViaje => {
      response.json(savedViaje)
    })
})

app.put('/api/viajes/:id', async (request, response) => {
  try{
    const { id } = request.params;
    const updateData = request.body
  
  //Objeto para las actulizaciones
  //   const updates =  {};

  //  // Verificar si se envió un cliente y agregarlo al objeto de actualizaciones
  //   if(clientes && clientes.length > 0){
  //     updates.$push = updates.$push || {};
  //     updates.$push.clientes = { $each: clientes};
  //   }

    // //Verificar si se enviaron gastos y agregarlos al objeto de actualizaciones
    // if(gastos?.[0]?.combustible || gastos?.[0]?.peajes || gastos?.[0]?.ayudantes || gastos?.[0]?.viaticos || gastos?.[0]?.comision){
    //   updates.push(combustible)
    // }

    const updatedViaje = await Viaje.findByIdAndUpdate(
      id,
      updateData,
      { new:true, upsert:false }
    );

    if(!updatedViaje){
      return response.status(404).json({ error: 'Viaje no econtrado'})
    }

    response.json(updatedViaje)
      // .then(updatedViaje => {
      //   response.json(updatedViaje)
      //   console.log("Esto es lo que devuelve el put: ", updatedViaje)
      // })
      // .catch(error =>{
      //   console.error('Error al actualizar el viaje:', error);
      // })  
  }catch(error){
    console.error('Error al actualizar el viaje: ', error)
    response.status(500).json({ error:'Error al actualizar el viaje'})
  }
  
  
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Endpoint desconocido' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})




