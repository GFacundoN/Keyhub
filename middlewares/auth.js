const logger = require('../config/logger');

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session?.user?.id) {
    return next();
  }
  
  // Log intento de acceso no autorizado
  logger.warn('Intento de acceso no autenticado', {
    ip: req.ip,
    path: req.path,
    method: req.method
  });
  
  // Guardar URL original para redirección después del login
  req.session.returnTo = req.originalUrl;
  res.redirect('/auth/login');
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  // Validación defensiva completa
  if (
    req.session?.user?.id &&
    req.session?.user?.roles &&
    Array.isArray(req.session.user.roles) &&
    (req.session.user.roles.includes('admin') || req.session.user.roles.includes('administrador'))
  ) {
    return next();
  }
  
  // Log intento de acceso no autorizado a área de admin
  logger.warn('Intento de acceso a área de administrador sin permisos', {
    userId: req.session?.user?.id || 'no-user',
    userRoles: req.session?.user?.roles || [],
    ip: req.ip,
    path: req.path
  });
  
  res.status(403).render('error', {
    title: 'Acceso Denegado',
    message: 'No tienes permisos de administrador para acceder a esta página',
    error: { status: 403 }
  });
};

// Middleware para verificar si el usuario es agente o admin
const isAgentOrAdmin = (req, res, next) => {
  if (
    req.session?.user?.id &&
    req.session?.user?.roles &&
    Array.isArray(req.session.user.roles) &&
    (req.session.user.roles.includes('admin') || 
     req.session.user.roles.includes('administrador') ||
     req.session.user.roles.includes('agente'))
  ) {
    return next();
  }
  
  logger.warn('Intento de acceso a área de agente sin permisos', {
    userId: req.session?.user?.id || 'no-user',
    userRoles: req.session?.user?.roles || [],
    ip: req.ip,
    path: req.path
  });
  
  res.status(403).render('error', {
    title: 'Acceso Denegado',
    message: 'No tienes permisos para acceder a esta página',
    error: { status: 403 }
  });
};

// Middleware para verificar roles específicos
const hasRole = (...roleNames) => {
  return (req, res, next) => {
    // Validación defensiva
    if (
      !req.session?.user?.id ||
      !req.session?.user?.roles ||
      !Array.isArray(req.session.user.roles)
    ) {
      logger.warn('Acceso denegado: usuario sin roles válidos', {
        userId: req.session?.user?.id || 'no-user',
        requiredRoles: roleNames,
        ip: req.ip,
        path: req.path
      });
      
      return res.status(403).render('error', {
        title: 'Acceso Denegado',
        message: 'No tienes permisos para acceder a esta página',
        error: { status: 403 }
      });
    }
    
    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasRequiredRole = roleNames.some(role => 
      req.session.user.roles.includes(role)
    );
    
    if (hasRequiredRole) {
      return next();
    }
    
    logger.warn('Acceso denegado: rol insuficiente', {
      userId: req.session.user.id,
      userRoles: req.session.user.roles,
      requiredRoles: roleNames,
      ip: req.ip,
      path: req.path
    });
    
    res.status(403).render('error', {
      title: 'Acceso Denegado',
      message: 'No tienes permisos para acceder a esta página',
      error: { status: 403 }
    });
  };
};

// Middleware para verificar que el usuario solo acceda a sus propios recursos
const isOwnerOrAdmin = (req, res, next) => {
  const resourceUserId = parseInt(req.params.id);
  const currentUserId = req.session?.user?.id;
  const userRoles = req.session?.user?.roles || [];
  
  // Admin puede acceder a cualquier recurso
  if (userRoles.includes('admin') || userRoles.includes('administrador')) {
    return next();
  }
  
  // Usuario debe ser el propietario del recurso
  if (currentUserId && resourceUserId === currentUserId) {
    return next();
  }
  
  logger.warn('Intento de acceso a recurso de otro usuario', {
    currentUserId,
    resourceUserId,
    ip: req.ip,
    path: req.path
  });
  
  res.status(403).render('error', {
    title: 'Acceso Denegado',
    message: 'No tienes permisos para acceder a este recurso',
    error: { status: 403 }
  });
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isAgentOrAdmin,
  hasRole,
  isOwnerOrAdmin
};
