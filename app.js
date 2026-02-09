const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para leer formularios
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta GET / (mostrar mensajes)
app.get('/', (req, res) => {
  const mensajesJSON = fs.readFileSync('mensajes.json', 'utf-8');
  const mensajes = JSON.parse(mensajesJSON);

  let html = `
    <h1>Mensajes</h1>
    <a href="/">Volver</a>
    <ul>
  `;

  mensajes.forEach(m => {
    html += `<li><strong>${m.usuario}:</strong> ${m.mensaje}</li>`;
  });

  html += `
    </ul>
    <a href="/">Volver al formulario</a>
  `;

  res.send(html);
});

// Ruta POST /nuevo-mensaje (guardar mensaje)
app.post('/nuevo-mensaje', (req, res) => {
  const nuevoMensaje = {
    usuario: req.body.usuario,
    mensaje: req.body.mensaje
  };

  const mensajesJSON = fs.readFileSync('mensajes.json', 'utf-8');
  const mensajes = JSON.parse(mensajesJSON);

  mensajes.push(nuevoMensaje);

  fs.writeFileSync(
    'mensajes.json',
    JSON.stringify(mensajes, null, 2)
  );

  res.redirect('/');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
