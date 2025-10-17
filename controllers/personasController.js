const Persona = require('../models/Persona');

const personasController = {
  // Listar todas las personas
  index: async (req, res) => {
    try {
      const personas = await Persona.getAll();
      res.render('personas/index', {
        title: 'Gestión de Personas',
        personas
      });
    } catch (error) {
      console.error('Error al obtener personas:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar las personas',
        error
      });
    }
  },

  // Mostrar formulario de creación
  create: async (req, res) => {
    try {
      res.render('personas/create', {
        title: 'Nueva Persona'
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

  // Guardar nueva persona
  store: async (req, res) => {
    try {
      const personaData = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        movil: req.body.movil,
        email: req.body.email,
        direccion: req.body.direccion
      };
      
      const id = await Persona.create(personaData);
      res.redirect(`/personas/${id}`);
    } catch (error) {
      console.error('Error al crear persona:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al crear la persona',
        error
      });
    }
  },

  // Mostrar detalle de una persona
  show: async (req, res) => {
    try {
      const persona = await Persona.getById(req.params.id);
      if (!persona) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'La persona no existe',
          error: { status: 404 }
        });
      }

      res.render('personas/show', {
        title: `${persona.nombre} ${persona.apellidos}`,
        persona
      });
    } catch (error) {
      console.error('Error al obtener persona:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la persona',
        error
      });
    }
  },

  // Mostrar formulario de edición
  edit: async (req, res) => {
    try {
      const persona = await Persona.getById(req.params.id);
      if (!persona) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'La persona no existe',
          error: { status: 404 }
        });
      }

      res.render('personas/edit', {
        title: 'Editar Persona',
        persona
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

  // Actualizar persona
  update: async (req, res) => {
    try {
      const personaData = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        movil: req.body.movil,
        email: req.body.email,
        direccion: req.body.direccion
      };

      await Persona.update(req.params.id, personaData);
      res.redirect(`/personas/${req.params.id}`);
    } catch (error) {
      console.error('Error al actualizar persona:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al actualizar la persona',
        error
      });
    }
  },

  // Eliminar persona
  destroy: async (req, res) => {
    try {
      await Persona.delete(req.params.id);
      res.redirect('/personas');
    } catch (error) {
      console.error('Error al eliminar persona:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al eliminar la persona',
        error
      });
    }
  }
};

module.exports = personasController;
