const { body, param, query, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    
    logger.warn('Errores de validación', {
      errors: errors.array(),
      path: req.path,
      userId: req.session?.user?.id || 'no-user'
    });
    
    // Si es una petición API, devolver JSON
    if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
      return res.status(400).json({
        success: false,
        errors: errorMessages
      });
    }
    
    // Si es una petición web, renderizar error
    return res.status(400).render('error', {
      title: 'Error de Validación',
      message: 'Los datos enviados no son válidos',
      error: { 
        status: 400,
        details: errorMessages
      }
    });
  }
  
  next();
};

// Validaciones para registro de usuario
const validateUserRegistration = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail()
    .isLength({ max: 120 })
    .withMessage('El email no debe exceder 120 caracteres'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  
  body('password_confirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Las contraseñas no coinciden'),
  
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo debe contener letras'),
  
  body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido solo debe contener letras'),
  
  body('dni')
    .trim()
    .notEmpty()
    .withMessage('El DNI es obligatorio')
    .isLength({ min: 7, max: 20 })
    .withMessage('El DNI debe tener entre 7 y 20 caracteres')
    .matches(/^[0-9]+$/)
    .withMessage('El DNI solo debe contener números'),
  
  body('telefono')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('El teléfono no debe exceder 20 caracteres')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('El teléfono solo debe contener números y símbolos válidos'),
  
  handleValidationErrors
];

// Validaciones para login
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
  
  handleValidationErrors
];

// Validaciones para actualización de usuario
const validateUserUpdate = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail()
    .isLength({ max: 120 })
    .withMessage('El email no debe exceder 120 caracteres'),
  
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo debe contener letras'),
  
  body('apellido')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido solo debe contener letras'),
  
  body('dni')
    .optional()
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage('El DNI debe tener entre 7 y 20 caracteres')
    .matches(/^[0-9]+$/)
    .withMessage('El DNI solo debe contener números'),
  
  body('telefono')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('El teléfono no debe exceder 20 caracteres'),
  
  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  
  handleValidationErrors
];

// Validaciones para formulario de contacto
const validateContact = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  
  body('asunto')
    .trim()
    .notEmpty()
    .withMessage('El asunto es obligatorio')
    .isLength({ min: 5, max: 200 })
    .withMessage('El asunto debe tener entre 5 y 200 caracteres'),
  
  body('mensaje')
    .trim()
    .notEmpty()
    .withMessage('El mensaje es obligatorio')
    .isLength({ min: 10, max: 2000 })
    .withMessage('El mensaje debe tener entre 10 y 2000 caracteres'),
  
  handleValidationErrors
];

// Validaciones para consulta de inmueble
const validateConsulta = [
  body('mensaje')
    .trim()
    .notEmpty()
    .withMessage('El mensaje es obligatorio')
    .isLength({ min: 10, max: 1000 })
    .withMessage('El mensaje debe tener entre 10 y 1000 caracteres'),
  
  body('fecha_visita')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('La fecha debe ser válida')
    .custom((value) => {
      const fecha = new Date(value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      return fecha >= hoy;
    })
    .withMessage('La fecha de visita debe ser hoy o posterior'),
  
  handleValidationErrors
];

// Validaciones para creación/actualización de inmueble
const validateInmueble = [
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),
  
  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 20, max: 2000 })
    .withMessage('La descripción debe tener entre 20 y 2000 caracteres'),
  
  body('direccion')
    .trim()
    .notEmpty()
    .withMessage('La dirección es obligatoria')
    .isLength({ min: 5, max: 255 })
    .withMessage('La dirección debe tener entre 5 y 255 caracteres'),
  
  body('precio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número válido mayor o igual a 0')
    .toFloat(),
  
  body('superficie')
    .isFloat({ min: 0 })
    .withMessage('La superficie debe ser un número válido mayor a 0')
    .toFloat(),
  
  body('habitaciones')
    .isInt({ min: 0, max: 50 })
    .withMessage('Las habitaciones deben ser un número entre 0 y 50')
    .toInt(),
  
  body('banos')
    .isInt({ min: 0, max: 20 })
    .withMessage('Los baños deben ser un número entre 0 y 20')
    .toInt(),
  
  body('tipo_id')
    .isInt({ min: 1 })
    .withMessage('Debe seleccionar un tipo de inmueble válido')
    .toInt(),
  
  body('zona_id')
    .isInt({ min: 1 })
    .withMessage('Debe seleccionar una zona válida')
    .toInt(),
  
  handleValidationErrors
];

// Validación de IDs en parámetros
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido')
    .toInt(),
  
  handleValidationErrors
];

// Validación de búsqueda
const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('El término de búsqueda no debe exceder 200 caracteres'),
  
  query('tipo')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El tipo debe ser un número válido')
    .toInt(),
  
  query('zona')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La zona debe ser un número válido')
    .toInt(),
  
  query('precio_min')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio mínimo debe ser un número válido')
    .toFloat(),
  
  query('precio_max')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio máximo debe ser un número válido')
    .toFloat(),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateLogin,
  validateUserUpdate,
  validateContact,
  validateConsulta,
  validateInmueble,
  validateId,
  validateSearch,
  handleValidationErrors
};
