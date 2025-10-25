const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usuariosController = require('../controllers/usuariosController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Configuración de Multer para subida de fotos de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/perfiles/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'perfil-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (JPG, PNG, GIF)'));
  }
});

// Todas las rutas de usuarios requieren autenticación
router.use(isAuthenticated);

// Middleware para manejar errores de Multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).render('error', {
        title: 'Archivo muy grande',
        message: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.',
        error: { status: 400 }
      });
    }
    return res.status(400).render('error', {
      title: 'Error al subir archivo',
      message: 'Hubo un problema al subir la imagen: ' + err.message,
      error: { status: 400 }
    });
  }
  if (err) {
    return res.status(400).render('error', {
      title: 'Error',
      message: err.message || 'Error al procesar el archivo',
      error: { status: 400 }
    });
  }
  next();
};

router.get('/', isAdmin, usuariosController.index);
router.get('/:id', usuariosController.show);
router.get('/:id/edit', usuariosController.edit);
router.put('/:id', upload.single('foto_perfil'), handleMulterError, usuariosController.update);
router.delete('/:id', isAdmin, usuariosController.destroy);

module.exports = router;
