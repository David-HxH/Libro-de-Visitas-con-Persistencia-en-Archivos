const http = require('http');

// Crear el servidor
const server = http.createServer((req, res) => {
  // Configurar la cabecera de la respuesta
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });

  // Enviar la respuesta y finalizar
  res.end('¡Hola Mundo!');
});

// Poner el servidor en escucha
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

