// app.js
// Bot de WhatsApp para Congelados Quilmes

const express = require("express");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
const port = process.env.PORT || 10000;

// Para que Express pueda leer los POST de Twilio
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta de prueba para ver si el servidor está vivo
app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes funcionando ✅");
});

// Ruta que Twilio va a llamar cuando llegue un WhatsApp
app.post("/mensaje", (req, res) => {
  const mensajeEntrante = (req.body.Body || "").trim();
  console.log("📩 Mensaje recibido:", mensajeEntrante);

  let respuesta = "";

  // Respuestas del bot
  if (mensajeEntrante.toLowerCase() === "hola") {
    respuesta =
      "Hola Luciano 👋 Soy tu bot de Congelados Quilmes. Escribí:\n" +
      "- *lista* para ver la lista de precios\n" +
      "- *pedido* para hacer un pedido\n" +
      "- *ayuda* para ver todas las opciones";
  } else if (mensajeEntrante.toLowerCase() === "lista") {
    respuesta =
      "📦 *Lista de productos principal*\n" +
      "- Hamburguesas de carne 100 g – $3.200/kg\n" +
      "- Hamburguesas de pollo 100 g – $3.200/kg\n" +
      "- Patynesa – $3.200/kg\n" +
      "- Milanesa de pollo – $4.500/kg\n\n" +
      "En breve vamos agregando más productos 😉";
  } else if (mensajeEntrante.toLowerCase() === "precios") {
    respuesta =
      "💰 Para ver los precios, escribí *lista* y te mando los principales productos.";
  } else {
    respuesta =
      "No entendí tu mensaje 🤖. Probá con:\n" +
      "- *hola*\n" +
      "- *lista*\n" +
      "- *pedido*\n" +
      "- *ayuda*";
  }

  // Armar respuesta en formato TwiML para Twilio
  const twiml = new MessagingResponse();
  twiml.message(respuesta);

  res.type("text/xml");
  res.send(twiml.toString());
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${port}`);
});
