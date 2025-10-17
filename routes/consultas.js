const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');
const { isAuthenticated } = require('../middlewares/auth');

// Rutas públicas
router.get('/nueva', consultasController.create);
router.post('/', consultasController.store);

// Rutas protegidas (admin)
router.get('/', isAuthenticated, consultasController.index);
router.get('/:id', isAuthenticated, consultasController.show);
router.put('/:id/estado', isAuthenticated, consultasController.updateEstado);
router.delete('/:id', isAuthenticated, consultasController.destroy);

module.exports = router;
