const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');

// Rutas de autenticación tradicional
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Rutas de autenticación con Google OAuth
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  authController.googleCallback
);

// Rutas para completar perfil de Google
router.get('/complete-profile', authController.showCompleteProfile);
router.post('/complete-profile', authController.completeProfile);

module.exports = router;
