const rateLimit = require('express-rate-limit');

// Rate limiter para intentos de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).render('error', {
      title: 'Demasiados Intentos',
      message: 'Has excedido el límite de intentos de inicio de sesión. Por favor, espera 15 minutos.',
      error: { status: 429 }
    });
  }
});

// Rate limiter para registro de usuarios
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 registros por hora
  message: 'Demasiados intentos de registro. Por favor, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).render('error', {
      title: 'Límite de Registro Excedido',
      message: 'Has excedido el límite de registros por hora. Por favor, intenta de nuevo más tarde.',
      error: { status: 429 }
    });
  }
});

// Rate limiter para endpoints de API generales
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests
  message: 'Demasiadas peticiones desde esta IP. Por favor, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para formulario de contacto
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // 5 mensajes por hora
  message: 'Demasiados mensajes enviados. Por favor, intenta de nuevo en una hora.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).render('error', {
      title: 'Límite de Mensajes Excedido',
      message: 'Has enviado demasiados mensajes. Por favor, intenta de nuevo en una hora.',
      error: { status: 429 }
    });
  }
});

// Rate limiter para creación de consultas
const consultaLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // 10 consultas por hora
  message: 'Demasiadas consultas enviadas. Por favor, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  registerLimiter,
  apiLimiter,
  contactLimiter,
  consultaLimiter
};
