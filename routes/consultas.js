const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');
const { isAuthenticated, isAgentOrAdmin, isAgentOrAdminOrRedirect } = require('../middlewares/auth');

// Rutas públicas
router.get('/nueva', consultasController.create);
router.post('/', consultasController.store);

// Rutas protegidas (admin y agentes)
// Si un usuario normal intenta acceder, será redirigido a /usuarios/mis-consultas
router.get('/', isAgentOrAdminOrRedirect, consultasController.index);
router.get('/:id', isAgentOrAdmin, consultasController.show);
router.put('/:id/estado', isAgentOrAdmin, consultasController.updateEstado);
router.post('/:id/responder', isAgentOrAdmin, consultasController.responder);
router.delete('/:id', isAgentOrAdmin, consultasController.destroy);

module.exports = router;
