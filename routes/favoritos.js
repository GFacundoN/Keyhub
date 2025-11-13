const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const { isAuthenticated } = require('../middlewares/auth');

// Todas las rutas de favoritos requieren autenticación
router.use(isAuthenticated);

// Ver lista de favoritos
router.get('/', favoritosController.index);

// Toggle favorito (agregar o eliminar)
router.post('/toggle', favoritosController.toggle);

// Agregar a favoritos
router.post('/add', favoritosController.add);

// Eliminar de favoritos
router.post('/remove', favoritosController.remove);
router.delete('/:inmuebleId', favoritosController.removeById);

module.exports = router;
