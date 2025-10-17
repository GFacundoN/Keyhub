const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');
const { isAuthenticated } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.get('/', isAuthenticated, personasController.index);
router.get('/create', isAuthenticated, personasController.create);
router.post('/', isAuthenticated, personasController.store);
router.get('/:id/edit', isAuthenticated, personasController.edit);
router.put('/:id', isAuthenticated, personasController.update);
router.delete('/:id', isAuthenticated, personasController.destroy);
router.get('/:id', isAuthenticated, personasController.show);

module.exports = router;
