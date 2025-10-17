const Inmueble = require('../models/Inmueble');

const inmueblesController = {
  // Listar todos los inmuebles
  index: async (req, res) => {
    try {
      const inmuebles = await Inmueble.getAll();
      res.render('inmuebles/index', {
        title: 'Inmuebles',
        inmuebles
      });
    } catch (error) {
      console.error('Error al obtener inmuebles:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar los inmuebles',
        error
      });
    }
  },

  // Mostrar formulario de creación
  create: async (req, res) => {
    try {
      // Obtener catálogos para el formulario
      const tipos = await Inmueble.getTipos();
      const zonas = await Inmueble.getZonas();
      const disposiciones = await Inmueble.getDisposiciones();
      const antiguedades = await Inmueble.getAntiguedades();
      const amenidades = await Inmueble.getAllAmenidades();

      res.render('inmuebles/create', {
        title: 'Nuevo Inmueble',
        tipos,
        zonas,
        disposiciones,
        antiguedades,
        amenidades
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

  // Guardar nuevo inmueble
  store: async (req, res) => {
    try {
      const inmuebleData = {
        tipo_id: req.body.tipo_id,
        codigo_inmueble: req.body.codigo_inmueble || `INM-${Date.now()}`,
        zona_id: req.body.zona_id,
        anunciante_tipo_id: 1, // Por defecto: Dueño/Desarrolladora (puedes cambiarlo según necesites)
        provincia: req.body.provincia || 'Buenos Aires',
        ciudad_localidad: req.body.ciudad_localidad || 'CABA',
        barrio: req.body.barrio,
        direccion: req.body.direccion,
        superficie_total_m2: req.body.superficie_total_m2,
        superficie_cubierta_m2: req.body.superficie_cubierta_m2,
        ambientes: req.body.ambientes,
        dormitorios: req.body.dormitorios,
        banos: req.body.banos,
        cocheras: req.body.cocheras || 0,
        disposicion_id: req.body.disposicion_id,
        antiguedad_categoria_id: req.body.antiguedad_categoria_id,
        anio_construccion: req.body.anio_construccion,
        descripcion: req.body.descripcion
      };
      
      const id = await Inmueble.create(inmuebleData);
      
      // Si hay amenidades seleccionadas, agregarlas
      if (req.body.amenidades && Array.isArray(req.body.amenidades)) {
        await Inmueble.addAmenidades(id, req.body.amenidades);
      }
      
      res.redirect(`/inmuebles/${id}`);
    } catch (error) {
      console.error('Error al crear inmueble:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al crear el inmueble',
        error
      });
    }
  },

  // Mostrar detalle de un inmueble
  show: async (req, res) => {
    try {
      const inmueble = await Inmueble.getById(req.params.id);
      if (!inmueble) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'El inmueble no existe',
          error: { status: 404 }
        });
      }

      const amenidades = await Inmueble.getAmenidades(req.params.id);

      res.render('inmuebles/show', {
        title: inmueble.direccion,
        inmueble,
        amenidades
      });
    } catch (error) {
      console.error('Error al obtener inmueble:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el inmueble',
        error
      });
    }
  },

  // Mostrar formulario de edición
  edit: async (req, res) => {
    try {
      const inmueble = await Inmueble.getById(req.params.id);
      if (!inmueble) {
        return res.status(404).render('error', {
          title: 'No encontrado',
          message: 'El inmueble no existe',
          error: { status: 404 }
        });
      }

      // Obtener catálogos para el formulario
      const tipos = await Inmueble.getTipos();
      const zonas = await Inmueble.getZonas();
      const disposiciones = await Inmueble.getDisposiciones();
      const antiguedades = await Inmueble.getAntiguedades();
      const amenidades = await Inmueble.getAllAmenidades();
      
      // Obtener amenidades del inmueble
      const amenidadesInmueble = await Inmueble.getAmenidades(req.params.id);
      const amenidadesIds = amenidadesInmueble.map(a => a.id);

      res.render('inmuebles/edit', {
        title: 'Editar Inmueble',
        inmueble,
        tipos,
        zonas,
        disposiciones,
        antiguedades,
        amenidades,
        amenidadesIds
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

  // Actualizar inmueble
  update: async (req, res) => {
    try {
      const inmuebleData = {
        tipo_id: req.body.tipo_id,
        zona_id: req.body.zona_id,
        barrio: req.body.barrio,
        direccion: req.body.direccion,
        superficie_total_m2: req.body.superficie_total_m2,
        superficie_cubierta_m2: req.body.superficie_cubierta_m2,
        ambientes: req.body.ambientes,
        dormitorios: req.body.dormitorios,
        banos: req.body.banos,
        cocheras: req.body.cocheras || 0,
        disposicion_id: req.body.disposicion_id,
        antiguedad_categoria_id: req.body.antiguedad_categoria_id,
        anio_construccion: req.body.anio_construccion,
        descripcion: req.body.descripcion
      };

      await Inmueble.update(req.params.id, inmuebleData);
      
      // Actualizar amenidades: primero eliminar todas y luego agregar las nuevas
      await Inmueble.removeAllAmenidades(req.params.id);
      if (req.body.amenidades && Array.isArray(req.body.amenidades)) {
        await Inmueble.addAmenidades(req.params.id, req.body.amenidades);
      }
      
      res.redirect(`/inmuebles/${req.params.id}`);
    } catch (error) {
      console.error('Error al actualizar inmueble:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al actualizar el inmueble',
        error
      });
    }
  },

  // Eliminar inmueble
  destroy: async (req, res) => {
    try {
      await Inmueble.delete(req.params.id);
      res.redirect('/inmuebles');
    } catch (error) {
      console.error('Error al eliminar inmueble:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al eliminar el inmueble',
        error
      });
    }
  },

  // Buscar inmuebles
  search: async (req, res) => {
    try {
      const inmuebles = await Inmueble.search(req.query);
      res.render('inmuebles/index', {
        title: 'Resultados de búsqueda',
        inmuebles,
        filters: req.query
      });
    } catch (error) {
      console.error('Error en búsqueda:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al buscar inmuebles',
        error
      });
    }
  },

  // Listar inmuebles para alquiler
  alquileres: async (req, res) => {
    try {
      const inmuebles = await Inmueble.getDisponiblesAlquiler();
      res.render('inmuebles/alquileres', {
        title: 'Inmuebles en Alquiler',
        inmuebles
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar alquileres',
        error
      });
    }
  },

  // Listar inmuebles para compra
  ventas: async (req, res) => {
    try {
      const inmuebles = await Inmueble.getDisponiblesCompra();
      res.render('inmuebles/ventas', {
        title: 'Inmuebles en Venta',
        inmuebles
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar ventas',
        error
      });
    }
  }
};

module.exports = inmueblesController;
