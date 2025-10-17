const express = require('express');
const router = express.Router();
const inmueblesController = require('../controllers/inmueblesController');
const { isAuthenticated } = require('../middlewares/auth');

// Rutas públicas
router.get('/', inmueblesController.index);
router.get('/alquileres', inmueblesController.alquileres);
router.get('/ventas', inmueblesController.ventas);
router.get('/search', inmueblesController.search);

// Rutas protegidas (requieren autenticación) - DEBEN IR ANTES DE /:id
router.get('/create', isAuthenticated, inmueblesController.create);
router.post('/', isAuthenticated, inmueblesController.store);
router.get('/:id/edit', isAuthenticated, inmueblesController.edit);
router.put('/:id', isAuthenticated, inmueblesController.update);
router.delete('/:id', isAuthenticated, inmueblesController.destroy);

// Ruta de detalle (debe ir al final para no capturar /create)
router.get('/:id', inmueblesController.show);

module.exports = router;
