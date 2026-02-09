const express = require('express');

const app = express();

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola Mundo con Express!');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
