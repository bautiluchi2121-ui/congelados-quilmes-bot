const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 10000;

// Para que Express pueda leer los POST de Twilio
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta de prueba para ver si tu bot funciona
app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes funcionando correctamente 🚚❄️");
});

// Ruta que Twilio va a llamar cuando llegue un mensaje
app.post("/mensaje", (req, res) => {
  const mensajeEntrante = req.body.Body || "";
  console.log("📩 Mensaje recibido:", mensajeEntrante);

  let respuesta = "";

  // Respuestas del bot
  if (mensajeEntrante.trim().toLowerCase() === "hola") {
    respuesta =
      "Hola Luciano 👋 Soy tu bot de Congelados Quilmes. ¿Qué necesitas?";
  } else if (mensajeEntrante.toLowerCase().includes("lista")) {
    respuesta =
      "Acá tenés la lista ❄️👇\n\n🥩 Hamburguesas $3200\n🍗 Patys de pollo $3200\n🍟 Patynesas $3200\n\n¿Querés hacer un pedido?";
  } else {
    respuesta =
      "No entiendo el mensaje 🤖. Escribí *hola* o *lista* para continuar.";
  }

  const twilio = require("twilio");
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(respuesta);

  res.type("text/xml");
  res.send(twiml.toString());
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
