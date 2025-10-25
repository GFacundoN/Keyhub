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
      const { username, password } = req.body;

      // Buscar usuario por email
      const usuario = await Usuario.getByUsername(username);
      
      if (!usuario) {
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const isValid = await Usuario.verifyPassword(password, usuario.password_hash);
      
      if (!isValid) {
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar si está activo
      if (!usuario.is_active) {
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

      // Crear sesión
      req.session.user = {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        foto_perfil: usuario.foto_perfil || null,
        rol: rolPrincipal,
        roles: rolesNombres
      };

      res.redirect('/');
    } catch (error) {
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
      const { email, password, password_confirm } = req.body;

      // Validar que las contraseñas coincidan
      if (password !== password_confirm) {
        return res.render('auth/register', {
          title: 'Registrarse',
          error: 'Las contraseñas no coinciden'
        });
      }

      // Verificar si el email ya existe
      const existingEmail = await Usuario.getByEmail(email);
      if (existingEmail) {
        return res.render('auth/register', {
          title: 'Registrarse',
          error: 'El email ya está registrado'
        });
      }

      // Crear usuario
      const usuarioData = {
        email,
        password,
        is_active: 1
      };

      const userId = await Usuario.create(usuarioData);

      // Iniciar sesión automáticamente
      req.session.user = {
        id: userId,
        email,
        nombre: null,
        foto_perfil: null,
        rol: 'usuario',
        roles: ['usuario']
      };

      res.redirect('/');
    } catch (error) {
      res.render('auth/register', {
        title: 'Registrarse',
        error: 'Error al registrar usuario'
      });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    req.session.destroy(() => {
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
      
      // DEBUG: Ver datos del usuario
      console.log('🔍 Datos del usuario de Google:', {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        foto_perfil: usuario.foto_perfil,
        google_id: usuario.google_id
      });
      
      // Determinar el rol principal
      let rolPrincipal = 'usuario'; // Por defecto
      const rolesNombres = roles.map(r => r.nombre.toLowerCase());
      
      if (rolesNombres.includes('admin') || rolesNombres.includes('administrador')) {
        rolPrincipal = 'admin';
      } else if (rolesNombres.includes('agente')) {
        rolPrincipal = 'agente';
      }

      // Crear sesión manual (por compatibilidad con el sistema existente)
      req.session.user = {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        foto_perfil: usuario.foto_perfil,
        rol: rolPrincipal,
        roles: rolesNombres
      };
      
      console.log('✅ Sesión creada con foto_perfil:', req.session.user.foto_perfil);

      res.redirect('/');
    } catch (error) {
      console.error('Error en callback de Google:', error);
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

      // Crear sesión del usuario
      req.session.user = {
        id: newUserId,
        email: googleData.email,
        nombre: googleData.nombre,
        foto_perfil: googleData.foto_perfil,
        rol: 'usuario',
        roles: ['usuario']
      };

      res.redirect('/');
    } catch (error) {
      console.error('Error al completar perfil:', error);
      res.render('auth/complete-profile', {
        title: 'Completar Perfil',
        googleData: req.session.pendingGoogleUser,
        error: 'Error al completar el perfil. Por favor, intenta nuevamente.'
      });
    }
  }
};

module.exports = authController;
