const Usuario = require('../models/Usuario');
const Consulta = require('../models/Consulta');
const Favorito = require('../models/Favorito');

const usuariosController = {
  // Listar todos los usuarios
  index: async (req, res) => {
    try {
      const usuarios = await Usuario.getAll();
      res.render('usuarios/index', {
        title: 'Usuarios',
        usuarios
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar los usuarios',
        error
      });
    }
  },

  // Mostrar perfil de usuario
  show: async (req, res) => {
    try {
      const usuario = await Usuario.getById(req.params.id);
      if (!usuario) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'El usuario no existe',
          error: { status: 404 }
        });
      }

      // Obtener favoritos del usuario
      const favoritos = await Favorito.getByUsuario(req.params.id);

      res.render('usuarios/show', {
        title: `Perfil de ${usuario.nombre || usuario.email.split('@')[0]}`,
        usuario,
        favoritos
      });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el usuario',
        error
      });
    }
  },

  // Mostrar formulario de edición
  edit: async (req, res) => {
    try {
      const usuario = await Usuario.getById(req.params.id);
      if (!usuario) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'El usuario no existe',
          error: { status: 404 }
        });
      }

      res.render('usuarios/edit', {
        title: 'Editar Usuario',
        usuario
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario',
        error
      });
    }
  },

  // Actualizar usuario
  update: async (req, res) => {
    try {
      const { nombre, apellido, dni, telefono, email, password, is_active } = req.body;
      
      // Datos del usuario (tabla usuario)
      const usuarioData = {
        email,
        is_active: is_active ? 1 : 0
      };

      // Si se subió una foto, agregarla
      if (req.file) {
        usuarioData.foto_perfil = `/uploads/perfiles/${req.file.filename}`;
      }

      // Si se proporciona contraseña, agregarla
      if (password && password.trim() !== '') {
        usuarioData.password = password;
      }

      // Datos de la persona (tabla persona)
      const personaData = {
        nombre: nombre || '',
        apellidos: apellido || '',  // La columna en BD se llama 'apellidos'
        dni: dni || null,
        movil: telefono || null,  // La columna en BD se llama 'movil'
        cod_personal: dni || `PER-${Date.now()}`  // Generar código personal
      };

      // Actualizar usuario y persona
      await Usuario.updateWithPersona(req.params.id, usuarioData, personaData);
      
      res.redirect(`/usuarios/${req.params.id}`);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al actualizar el usuario: ' + error.message,
        error
      });
    }
  },

  // Eliminar usuario
  destroy: async (req, res) => {
    try {
      await Usuario.delete(req.params.id);
      res.redirect('/usuarios');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al eliminar el usuario',
        error
      });
    }
  },

  // Ver mis consultas
  misConsultas: async (req, res) => {
    try {
      // Verificar que el usuario esté logueado
      if (!req.session.user) {
        return res.redirect('/auth/login');
      }

      const consultas = await Consulta.getByUserEmail(req.session.user.email);
      
      res.render('usuarios/consultas', {
        title: 'Mis Consultas',
        consultas
      });
    } catch (error) {
      console.error('Error al obtener consultas:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar las consultas',
        error
      });
    }
  }
};

module.exports = usuariosController;
