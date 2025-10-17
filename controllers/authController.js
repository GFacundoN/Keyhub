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
        username: usuario.email,
        email: usuario.email,
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
        username: email,
        email,
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
  }
};

module.exports = authController;
