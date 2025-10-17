// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.roles.includes('admin')) {
    return next();
  }
  res.status(403).render('error', {
    title: 'Acceso Denegado',
    message: 'No tienes permisos para acceder a esta página',
    error: { status: 403 }
  });
};

// Middleware para verificar roles específicos
const hasRole = (roleName) => {
  return (req, res, next) => {
    if (req.session && req.session.user && req.session.user.roles.includes(roleName)) {
      return next();
    }
    res.status(403).render('error', {
      title: 'Acceso Denegado',
      message: 'No tienes permisos para acceder a esta página',
      error: { status: 403 }
    });
  };
};

module.exports = {
  isAuthenticated,
  isAdmin,
  hasRole
};
