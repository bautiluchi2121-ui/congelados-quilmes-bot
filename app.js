const express = require("express");
const app = express();

// Puerto que usa Render (si no hay PORT, usa 10000 para pruebas locales)
const port = process.env.PORT || 10000;

// Para que Express pueda leer los datos que manda Twilio en el body (Body, From, etc.)
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba para el navegador
app.get("/", (req, res) => {
  res.send("Bot de Congelados Quilmes activo ✅");
});

// Ruta que Twilio va a llamar cuando llegue un mensaje de WhatsApp
app.post("/mensaje", (req, res) => {
  // Texto que escribió la persona en WhatsApp
  const textoOriginal = (req.body.Body || "").trim();
  const texto = textoOriginal.toLowerCase();

  let respuesta;

  if (!texto) {
    respuesta =
      "Hola 👋, soy el bot de *Congelados Quilmes*.\nEscribime tu pedido o la palabra *MENU* para ver opciones.";
  } else if (texto === "menu") {
    respuesta =
      "📋 *MENÚ CONGELADOS QUILMES*\n" +
      "1️⃣ Lista de precios\n" +
      "2️⃣ Hacer un pedido\n" +
      "3️⃣ Hablar con un humano 👨‍🍳\n\n" +
      "Escribí el número de opción.";
  } else {
    respuesta =
      "✅ Recibí tu mensaje:\n\n\"" +
      textoOriginal +
      "\"\n\nEn breve lo revisamos. Gracias por escribir a *Congelados Quilmes* 🧊🍔";
  }

  // TwiML (formato que Twilio necesita)
  const twiml = `
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `;

  // Responder a Twilio en formato XML
  res.set("Content-Type", "text/xml");
  res.send(twiml);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor de Congelados Quilmes escuchando en el puerto ${port}`);
});
