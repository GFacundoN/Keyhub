const Usuario = require('../models/Usuario');

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

      const roles = await Usuario.getRoles(req.params.id);

      res.render('usuarios/show', {
        title: `Perfil de ${usuario.username}`,
        usuario,
        roles
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
      const updateData = { ...req.body };
      
      // Si no se proporciona contraseña, no actualizarla
      if (!updateData.password) {
        delete updateData.password;
      }

      await Usuario.update(req.params.id, updateData);
      res.redirect(`/usuarios/${req.params.id}`);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al actualizar el usuario',
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
  }
};

module.exports = usuariosController;
