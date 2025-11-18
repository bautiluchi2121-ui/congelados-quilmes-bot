// aplicación.js
// Bot de WhatsApp para Congelados Quilmes usando Twilio + Render

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Render asigna el puerto en la variable de entorno PORT
const port = process.env.PORT || 10000;

// Middleware para que Express pueda leer los datos que envía Twilio
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta de prueba para ver que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Bot de Congelados Quilmes activo ✅');
});

// Ruta que Twilio va a llamar cuando llegue un WhatsApp
// IMPORTANTE: esta ruta debe coincidir con /mensaje en Twilio
app.post('/mensaje', (req, res) => {
  const body = req.body.Body || '';   // Texto que envió la persona
  const from = req.body.From || '';   // Número de WhatsApp del remitente

  console.log('Mensaje recibido de:', from, '->', body);

  // Mensaje de respuesta que recibirá el cliente
  const respuesta =
    'Hola 👋, soy el bot de *Congelados Quilmes*.\n\n' +
    'Recibí tu mensaje: "' + body + '".\n' +
    'En breve Luciano te va a responder.';

  // Twilio necesita que respondamos en formato TwiML (XML)
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${respuesta}</Message>
</Response>`;

  res.set('Content-Type', 'text/xml');
  res.status(200).send(twiml);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de Congelados Quilmes escuchando en el puerto ${port}`);
});
