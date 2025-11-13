const Usuario = require('../models/Usuario');

const authController = {
  // Mostrar formulario de login
  showLogin: (req, res) => {
    res.render('auth/login', {
      title: 'Iniciar Sesión'
    });
  },

  // Procesar login
  login: async (req, res) => {
    try {
      const { email, password } = req.body; // El validador normaliza el campo

      // Buscar usuario por email
      const usuario = await Usuario.getByUsername(email);
      
      if (!usuario) {
        console.warn('Intento de login fallido: usuario no encontrado', {
          email: email,
          ip: req.ip
        });
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const isValid = await Usuario.verifyPassword(password, usuario.password_hash);
      
      if (!isValid) {
        console.warn('Intento de login fallido: contraseña incorrecta', {
          userId: usuario.id,
          email: email,
          ip: req.ip
        });
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar si está activo
      if (!usuario.is_active) {
        console.warn('Intento de login de usuario inactivo', {
          userId: usuario.id,
          email: email,
          ip: req.ip
        });
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario inactivo. Contacte al administrador'
        });
      }

      // Obtener roles del usuario
      const roles = await Usuario.getRoles(usuario.id);
      
      // Determinar el rol principal (el más alto en jerarquía)
      let rolPrincipal = 'usuario'; // Por defecto
      const rolesNombres = roles.map(r => r.nombre.toLowerCase());
      
      if (rolesNombres.includes('admin') || rolesNombres.includes('administrador')) {
        rolPrincipal = 'admin';
      } else if (rolesNombres.includes('agente')) {
        rolPrincipal = 'agente';
      }

      // Crear nombre completo
      const nombreCompleto = usuario.nombre ? 
        `${usuario.nombre}${usuario.apellidos ? ' ' + usuario.apellidos : ''}`.trim() : 
        usuario.email.split('@')[0];
      
      // Crear sesión de usuario
      req.session.user = {
        id: usuario.id,
        email: usuario.email,
        nombre: nombreCompleto,
        foto_perfil: usuario.foto_perfil || null,
        rol: rolPrincipal,
        roles: rolesNombres
      };

      // Login exitoso

      // Redirigir (funciona instantáneamente con sesiones en memoria)
      const returnTo = req.session.returnTo || '/';
      delete req.session.returnTo;
      res.redirect(returnTo);
    } catch (error) {
      console.error('Error en proceso de login', {
        error: error.message,
        stack: error.stack
      });
      res.render('auth/login', {
        title: 'Iniciar Sesión',
        error: 'Error al iniciar sesión'
      });
    }
  },

  // Mostrar formulario de registro
  showRegister: (req, res) => {
    res.render('auth/register', {
      title: 'Registrarse'
    });
  },

  // Procesar registro
  register: async (req, res) => {
    try {
      const { email, password, nombre, apellido, dni, telefono } = req.body;

      // Verificar si el email ya existe
      const existingEmail = await Usuario.getByEmail(email);
      if (existingEmail) {
        console.warn('Intento de registro con email existente', {
          email: email,
          ip: req.ip
        });
        return res.render('auth/register', {
          title: 'Registrarse',
          error: 'El email ya está registrado'
        });
      }

      // Verificar si el DNI ya existe
      const Persona = require('../models/Persona');
      const existingDni = await Persona.getByDni(dni);
      if (existingDni) {
        console.warn('Intento de registro con DNI existente', {
          dni: dni,
          ip: req.ip
        });
        return res.render('auth/register', {
          title: 'Registrarse',
          error: 'El DNI ya está registrado'
        });
      }

      // Crear persona
      const personaData = {
        nombre,
        apellidos: apellido,
        dni,
        movil: telefono || null,
        cod_personal: `PER-${Date.now()}`
      };

      // Crear usuario con persona
      const usuarioData = {
        email,
        password,
        is_active: 1,
        auth_provider: 'local'
      };

      const userId = await Usuario.createGoogleUser(usuarioData, personaData);

      console.info('Nuevo usuario registrado exitosamente', {
        userId: userId,
        email: email,
        ip: req.ip
      });

      // Iniciar sesión automáticamente
      req.session.user = {
        id: userId,
        email,
        nombre,
        foto_perfil: null,
        rol: 'usuario',
        roles: ['usuario']
      };

      console.info('Usuario registrado e inició sesión', {
        userId: userId,
        email: email,
        ip: req.ip
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error en proceso de registro', {
        error: error.message,
        stack: error.stack
      });
      res.render('auth/register', {
        title: 'Registrarse',
        error: 'Error al registrar usuario'
      });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    const userId = req.session?.user?.id;
    const userEmail = req.session?.user?.email;
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión', { error: err.message });
      } else {
        console.info('Usuario cerró sesión', {
          userId: userId,
          email: userEmail,
          ip: req.ip
        });
      }
      res.redirect('/');
    });
  },

  // Callback de Google OAuth
  googleCallback: async (req, res) => {
    try {
      const usuario = req.user;
      
      // Si es un usuario pendiente (nuevo), redirigir a completar perfil
      if (usuario.isPending) {
        req.session.pendingGoogleUser = usuario.googleData;
        return res.redirect('/auth/complete-profile');
      }
      
      // Usuario existente - obtener roles
      const roles = await Usuario.getRoles(usuario.id);
      
      // Determinar el rol principal
      let rolPrincipal = 'usuario'; // Por defecto
      const rolesNombres = roles.map(r => r.nombre.toLowerCase());
      
      if (rolesNombres.includes('admin') || rolesNombres.includes('administrador')) {
        rolPrincipal = 'admin';
      } else if (rolesNombres.includes('agente')) {
        rolPrincipal = 'agente';
      }

      // Crear nombre completo
      const nombreCompleto = usuario.nombre ? 
        `${usuario.nombre}${usuario.apellidos ? ' ' + usuario.apellidos : ''}`.trim() : 
        usuario.email.split('@')[0];

      // Crear sesión de usuario
      req.session.user = {
        id: usuario.id,
        email: usuario.email,
        nombre: nombreCompleto,
        foto_perfil: usuario.foto_perfil || null,
        rol: rolPrincipal,
        roles: rolesNombres
      };

      console.info('Usuario inició sesión con Google exitosamente', {
        userId: usuario.id,
        email: usuario.email,
        ip: req.ip
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error en callback de Google OAuth', {
        error: error.message,
        stack: error.stack
      });
      res.redirect('/auth/login');
    }
  },

  // Mostrar formulario para completar perfil de Google
  showCompleteProfile: (req, res) => {
    if (!req.session.pendingGoogleUser) {
      return res.redirect('/auth/login');
    }

    res.render('auth/complete-profile', {
      title: 'Completar Perfil',
      googleData: req.session.pendingGoogleUser
    });
  },

  // Procesar formulario de completar perfil
  completeProfile: async (req, res) => {
    try {
      if (!req.session.pendingGoogleUser) {
        return res.redirect('/auth/login');
      }

      const googleData = req.session.pendingGoogleUser;
      const { dni, movil } = req.body;

      // Verificar si ya existe una persona con ese DNI
      const Persona = require('../models/Persona');
      const existingPersona = await Persona.getByDni(dni);
      if (existingPersona) {
        return res.render('auth/complete-profile', {
          title: 'Completar Perfil',
          googleData: googleData,
          error: 'Ya existe un usuario registrado con ese DNI. Si ya tienes una cuenta, intenta iniciar sesión normalmente.'
        });
      }

      // Crear usuario con datos de Google + datos adicionales
      const newUserId = await Usuario.createGoogleUser({
        google_id: googleData.google_id,
        email: googleData.email,
        foto_perfil: googleData.foto_perfil,
        auth_provider: 'google',
        is_active: 1
      }, {
        nombre: googleData.nombre,
        apellidos: googleData.apellidos,
        dni: dni,
        movil: movil || null,
        cod_personal: `GOOGLE-${Date.now()}`
      });

      // Asignar rol de usuario por defecto
      const rolesResult = await Usuario.getRoleIdByName('usuario');
      if (rolesResult) {
        await Usuario.assignRole(newUserId, rolesResult.id);
      }

      // Limpiar datos pendientes
      delete req.session.pendingGoogleUser;

      // Crear nombre completo
      const nombreCompleto = `${googleData.nombre}${googleData.apellidos ? ' ' + googleData.apellidos : ''}`.trim();

      // Crear sesión del usuario
      req.session.user = {
        id: newUserId,
        email: googleData.email,
        nombre: nombreCompleto,
        foto_perfil: googleData.foto_perfil || null,
        rol: 'usuario',
        roles: ['usuario']
      };

      console.info('Usuario de Google completó perfil exitosamente', {
        userId: newUserId,
        email: googleData.email,
        ip: req.ip
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error al completar perfil de Google', {
        error: error.message,
        stack: error.stack
      });
      res.render('auth/complete-profile', {
        title: 'Completar Perfil',
        googleData: req.session.pendingGoogleUser,
        error: 'Error al completar el perfil. Por favor, intenta nuevamente.'
      });
    }
  }
};

module.exports = authController;
