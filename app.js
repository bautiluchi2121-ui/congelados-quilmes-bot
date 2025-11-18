const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes funcionando correctamente.");
});

// 📩 Cuando Twilio envíe un mensaje, responderá esto
app.post("/mensaje", (req, res) => {
  const mensaje = req.body.Body || "";

  let respuesta = "Hola! Soy el bot de Congelados Quilmes 🤖🧊\n";
  respuesta += "Escribime tu pedido o consulta.";

  // Enviar respuesta
  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

app.listen(port, () => {
  console.log("Servidor iniciado en puerto " + port);
});
`
