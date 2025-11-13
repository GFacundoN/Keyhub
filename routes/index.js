const express = require('express');
const router = express.Router();
const Inmueble = require('../models/Inmueble');
const emailService = require('../services/emailService');
const { contactLimiter } = require('../middlewares/rateLimiter');
const { validateContact } = require('../middlewares/validators');

// Página principal
router.get('/', async (req, res) => {
  try {
    const inmueblesDestacados = await Inmueble.getAll();
    const tipos = await Inmueble.getTipos();
    const zonas = await Inmueble.getZonas();
    
    res.render('index', {
      title: 'KeyHub - Inicio',
      inmuebles: inmueblesDestacados.slice(0, 6), // Mostrar solo 6 destacados
      tipos,
      zonas
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', {
      title: 'KeyHub - Inicio',
      inmuebles: [],
      tipos: [],
      zonas: []
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

// Procesar formulario de contacto
router.post('/contact', contactLimiter, validateContact, async (req, res) => {
  try {
    const contactData = {
      nombre: req.body.nombre,
      email: req.body.email,
      asunto: req.body.asunto,
      mensaje: req.body.mensaje
    };

    // Intentar enviar email
    try {
      const emailResult = await emailService.sendContactEmail(contactData);
      
      if (!emailResult.success) {
        console.warn('Advertencia: No se pudo enviar el email de contacto:', emailResult.error);
      } else {
        console.log('Email de contacto enviado exitosamente');
      }
    } catch (emailError) {
      console.error('Error al enviar email de contacto (no crítico):', emailError.message);
    }

    res.render('contact-success', {
      title: 'Mensaje Enviado',
      message: '¡Gracias por contactarnos! Responderemos tu mensaje lo antes posible.'
    });
  } catch (error) {
    console.error('Error al procesar contacto:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al enviar el mensaje de contacto',
      error
    });
  }
});

module.exports = router;
