const Usuario = require('../models/Usuario');
const Favorito = require('../models/Favorito');

const favoritosController = {
  // Listar todos los favoritos del usuario actual
  index: async (req, res) => {
    try {
      const favoritos = await Usuario.getFavoritos(req.user.id);
      res.render('usuarios/favoritos', {
        title: 'Mis Favoritos',
        favoritos
      });
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar tus favoritos',
        error
      });
    }
  },

  // Agregar un inmueble a favoritos (API endpoint)
  add: async (req, res) => {
    try {
      const { inmuebleId } = req.body;
      
      if (!inmuebleId) {
        return res.status(400).json({ 
          success: false, 
          message: 'ID de inmueble requerido' 
        });
      }

      await Usuario.addFavorito(req.user.id, inmuebleId);
      
      res.json({ 
        success: true, 
        message: 'Inmueble agregado a favoritos' 
      });
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error al agregar a favoritos' 
      });
    }
  },

  // Eliminar un inmueble de favoritos (API endpoint)
  remove: async (req, res) => {
    try {
      const { inmuebleId } = req.body;
      
      if (!inmuebleId) {
        return res.status(400).json({ 
          success: false, 
          message: 'ID de inmueble requerido' 
        });
      }

      await Usuario.removeFavorito(req.user.id, inmuebleId);
      
      res.json({ 
        success: true, 
        message: 'Inmueble eliminado de favoritos' 
      });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error al eliminar de favoritos' 
      });
    }
  },

  // Toggle favorito (agregar o eliminar)
  toggle: async (req, res) => {
    try {
      const { inmuebleId } = req.body;
      
      if (!inmuebleId) {
        return res.status(400).json({ 
          success: false, 
          message: 'ID de inmueble requerido' 
        });
      }

      const esFavorito = await Usuario.isFavorito(req.user.id, inmuebleId);
      
      if (esFavorito) {
        await Usuario.removeFavorito(req.user.id, inmuebleId);
        res.json({ 
          success: true, 
          action: 'removed',
          message: 'Inmueble eliminado de favoritos' 
        });
      } else {
        await Usuario.addFavorito(req.user.id, inmuebleId);
        res.json({ 
          success: true, 
          action: 'added',
          message: 'Inmueble agregado a favoritos' 
        });
      }
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error al modificar favoritos' 
      });
    }
  },

  // Eliminar favorito y redirigir al perfil
  removeById: async (req, res) => {
    try {
      const inmuebleId = req.params.inmuebleId;
      const usuarioId = req.session.user.id;
      
      await Favorito.delete(usuarioId, inmuebleId);
      
      res.redirect(`/usuarios/${usuarioId}`);
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al eliminar de favoritos',
        error
      });
    }
  }
};

module.exports = favoritosController;
