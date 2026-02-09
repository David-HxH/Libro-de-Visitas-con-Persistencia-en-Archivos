const express = require('express');
const hbs = require('hbs'); // Requerimos HBS
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials'); // Registramos los parciales
app.use(express.static('public'));

// Helper para la clase de prioridad
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') {
    return 'priority-high';
  } else if (priority === 'media') {
    return 'priority-medium';
  } else {
    return 'priority-low';
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nombre: 'Ana',
    profesion: 'Desarrolladora Web'
  });
});

app.get('/dashboard', (req, res) => {
  const data = {
    user: {
      name: 'Carlos',
      isAdmin: true
    },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
          { description: 'Crear documentación', priority: 'media' }
        ]
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [
          { description: 'Migrar a React 18', priority: 'baja' },
          { description: 'Actualizar dependencias', priority: 'baja' }
        ]
      },
      {
        name: 'Base de Datos',
        isCompleted: false,
        tasks: [] // Proyecto sin tareas para probar el condicional 'else'
      }
    ]
  };
  res.render('dashboard', data);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
