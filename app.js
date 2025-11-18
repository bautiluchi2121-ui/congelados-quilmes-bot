const express = require("express");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes funcionando!");
});

// Ruta que Twilio llamará
app.post("/mensaje", (req, res) => {
  const mensaje = req.body.Body ? req.body.Body.toLowerCase() : "";
  console.log("📩 Mensaje recibido:", mensaje);

  const twiml = new MessagingResponse();
  const respuesta = twiml.message();

  if (mensaje.includes("hola")) {
    respuesta.body("Hola Luciano 👋 Soy tu bot de Congelados Quilmes.");
  } else if (mensaje.includes("precio") || mensaje.includes("lista")) {
    respuesta.body("👉 Lista de precios 2025:\n🍔 Hamburguesas $3200\n🍗 Pollo $4500\n🥩 Picada especial $6000/kg");
  } else {
    respuesta.body("No entendí tu mensaje. Escribí *hola* o *precios*.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en puerto ${port}`);
});
