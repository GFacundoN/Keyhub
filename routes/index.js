const express = require('express');
const router = express.Router();
const Inmueble = require('../models/Inmueble');

// Página principal
router.get('/', async (req, res) => {
  try {
    const inmueblesDestacados = await Inmueble.getAll();
    res.render('index', {
      title: 'KeyHub - Inicio',
      inmuebles: inmueblesDestacados.slice(0, 6) // Mostrar solo 6 destacados
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', {
      title: 'KeyHub - Inicio',
      inmuebles: []
    });
  }
});

// Página "Acerca de"
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Acerca de KeyHub'
  });
});

// Página de contacto
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contacto'
  });
});

module.exports = router;
