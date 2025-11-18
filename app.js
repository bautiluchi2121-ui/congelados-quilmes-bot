const express = require("express");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
const port = process.env.PORT || 10000;

// Para que Express pueda leer los POST de Twilio
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta de prueba para ver si el servidor funciona
app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes funcionando!");
});

// Ruta que Twilio va a llamar cuando llegue un mensaje
app.post("/whatsapp", (req, res) => {
  const twiml = new MessagingResponse();

  const mensajeUsuario = req.body.Body ? req.body.Body.trim().toLowerCase() : "";

  console.log("Mensaje recibido:", mensajeUsuario);

  if (mensajeUsuario.includes("hola")) {
    twiml.message("Hola Luciano! 👋 Soy el bot de Congelados Quilmes. ¿En qué puedo ayudarte?");
  } else if (mensajeUsuario.includes("precio") || mensajeUsuario.includes("lista")) {
    twiml.message("👉 Lista de precios 2025:\n🍔 Hamburguesas $3200/kg\n🐔 Milanesa pollo $4500/kg\n🥩 Picada especial $6000/kg");
  } else {
    twiml.message("No entendí tu mensaje. Escribí *Hola* o *Precios*.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
