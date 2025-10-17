const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Todas las rutas de usuarios requieren autenticación
router.use(isAuthenticated);

router.get('/', isAdmin, usuariosController.index);
router.get('/:id', usuariosController.show);
router.get('/:id/edit', usuariosController.edit);
router.put('/:id', usuariosController.update);
router.delete('/:id', isAdmin, usuariosController.destroy);

module.exports = router;
