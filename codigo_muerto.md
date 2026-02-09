const path = require('path'); // Módulo nativo de Node.js para manejar rutas de archivos
const express = require('express');
const hbs = require('hbs'); // Motor de plantillas Handlebars
const fs = require('fs').promises; // Módulo nativo de Node.js para manejar el sistema de archivos con promesas

const app = express(); // Crear una instancia de la aplicación Express

// uso de Json y form-urlencoded
app.use(express.json()); // Para parsear cuerpos JSON
app.use(express.urlencoded({ extended: true })); // Para parsear cuerpos de formularios

/* =============================
   CONFIGURACIÓN DE HANDLEBARS
   ============================= */

// Motor de vistas
app.set('view engine', 'hbs');

// Ruta de vistas
const viewsPath = path.join(__dirname, 'templates', 'views'); // Carpeta personalizada para vistas
app.set('views', viewsPath); // Configurar la ruta de vistas

// Ruta de parciales
const partialsPath = path.join(__dirname, 'templates', 'partials');
hbs.registerPartials(partialsPath);

/* ==========
   HELPERS
   ========== */

// Helper sin argumentos
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Helper con argumentos
hbs.registerHelper('formatCurrency', (number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(number);
});

/* ==================
   ARCHIVOS ESTÁTICOS
   ================== */

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

/* ======
   RUTAS
   ====== */

app.get('/perfil', (req, res) => {
  res.render('perfil', {
    titulo: 'Perfil de Usuario',
    usuario: {
      nombre: 'Ana',
      logueado: true
    },
    productos: [
      { nombre: 'Laptop', precio: 1200 },
      { nombre: 'Mouse', precio: 25 },
      { nombre: 'Teclado', precio: 80 }
    ]
  });
});

/* =========
   SERVIDOR
   ========= */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT} ✨`);
});