const Consulta = require('../models/Consulta');
const Inmueble = require('../models/Inmueble');
const emailService = require('../services/emailService');

const consultasController = {
  // Mostrar formulario de consulta (público)
  create: async (req, res) => {
    try {
      const inmuebleId = req.query.inmueble_id;
      let inmueble = null;

      if (inmuebleId) {
        inmueble = await Inmueble.getById(inmuebleId);
      }

      res.render('consultas/create', {
        title: 'Solicitar Información',
        inmueble
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

  // Guardar nueva consulta (público)
  store: async (req, res) => {
    try {
      const consultaData = {
        inmueble_id: req.body.inmueble_id || null,
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        mensaje: req.body.mensaje,
        tipo_consulta: req.body.tipo_consulta || 'INFORMACION',
        estado: 'PENDIENTE',
        fecha_consulta: new Date()
      };

      await Consulta.create(consultaData);
      
      // Intentar enviar email de notificación (no crítico)
      try {
        // Obtener datos del inmueble si existe
        let inmueble = null;
        if (consultaData.inmueble_id) {
          inmueble = await Inmueble.getById(consultaData.inmueble_id);
        }
        
        // Enviar email de notificación
        const emailResult = await emailService.sendConsultaEmail(consultaData, inmueble);
        
        if (!emailResult.success) {
          console.warn('Advertencia: No se pudo enviar el email de notificación:', emailResult.error);
        } else {
          console.log('Email de notificación enviado exitosamente');
        }
      } catch (emailError) {
        // Si falla el email, solo logueamos el error pero continuamos
        console.error('Error al enviar email (no crítico):', emailError.message);
      }
      
      res.render('consultas/success', {
        title: 'Consulta Enviada',
        message: '¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.'
      });
    } catch (error) {
      console.error('Error al crear consulta:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al enviar la consulta',
        error
      });
    }
  },

  // Listar todas las consultas (admin)
  index: async (req, res) => {
    try {
      const consultas = await Consulta.getAll();
      res.render('consultas/index', {
        title: 'Gestión de Consultas',
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
  },

  // Ver detalle de consulta (admin)
  show: async (req, res) => {
    try {
      const consulta = await Consulta.getById(req.params.id);
      if (!consulta) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'La consulta no existe',
          error: { status: 404 }
        });
      }

      res.render('consultas/show', {
        title: 'Detalle de Consulta',
        consulta
      });
    } catch (error) {
      console.error('Error al obtener consulta:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la consulta',
        error
      });
    }
  },

  // Actualizar estado (admin)
  updateEstado: async (req, res) => {
    try {
      await Consulta.updateEstado(req.params.id, req.body.estado);
      res.redirect(`/consultas/${req.params.id}`);
    } catch (error) {
      console.error('Error al actualizar consulta:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al actualizar la consulta',
        error
      });
    }
  },

  // Eliminar consulta (admin)
  destroy: async (req, res) => {
    try {
      await Consulta.delete(req.params.id);
      res.redirect('/consultas');
    } catch (error) {
      console.error('Error al eliminar consulta:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al eliminar la consulta',
        error
      });
    }
  }
};

module.exports = consultasController;
