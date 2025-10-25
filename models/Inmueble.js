const db = require('../config/database');

class Inmueble {
  // Obtener todos los inmuebles con información relacionada
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre,
        ac.nombre as antiguedad_nombre,
        d.nombre as disposicion_nombre
      FROM inmueble i
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      LEFT JOIN antiguedad_categoria ac ON i.antiguedad_categoria_id = ac.id
      LEFT JOIN disposicion d ON i.disposicion_id = d.id
      ORDER BY i.created_at DESC
    `);
    return rows;
  }

  // Obtener inmueble por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre,
        ac.nombre as antiguedad_nombre,
        d.nombre as disposicion_nombre
      FROM inmueble i
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      LEFT JOIN antiguedad_categoria ac ON i.antiguedad_categoria_id = ac.id
      LEFT JOIN disposicion d ON i.disposicion_id = d.id
      WHERE i.id = ?
    `, [id]);
    return rows[0];
  }

  // Obtener inmuebles disponibles para alquiler
  static async getDisponiblesAlquiler() {
    const [rows] = await db.query(`
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre
      FROM inmueble i
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      WHERE i.tipo_operacion = 'alquiler' AND i.disponible = TRUE
      ORDER BY i.created_at DESC
    `);
    return rows;
  }

  // Obtener inmuebles disponibles para compra
  static async getDisponiblesCompra() {
    const [rows] = await db.query(`
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre
      FROM inmueble i
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      WHERE i.tipo_operacion = 'venta' AND i.disponible = TRUE
      ORDER BY i.created_at DESC
    `);
    return rows;
  }

  // Crear nuevo inmueble
  static async create(inmuebleData) {
    const [result] = await db.query(
      'INSERT INTO inmueble SET ?',
      [inmuebleData]
    );
    return result.insertId;
  }

  // Actualizar inmueble
  static async update(id, inmuebleData) {
    const [result] = await db.query(
      'UPDATE inmueble SET ? WHERE id = ?',
      [inmuebleData, id]
    );
    return result.affectedRows;
  }

  // Eliminar inmueble
  static async delete(id) {
    const [result] = await db.query('DELETE FROM inmueble WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Buscar inmuebles con filtros
  static async search(filters) {
    console.log('🔍 Búsqueda con filtros:', filters);
    
    let query = `
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre
      FROM inmueble i
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      WHERE 1=1
    `;
    const params = [];

    // Filtro por tipo (puede ser array para múltiples tipos)
    if (filters['tipo_id[]']) {
      const tipos = Array.isArray(filters['tipo_id[]']) ? filters['tipo_id[]'] : [filters['tipo_id[]']];
      query += ` AND i.tipo_id IN (${tipos.map(() => '?').join(',')})`;
      params.push(...tipos);
    }

    // Filtro por zona
    if (filters.zona_id) {
      query += ' AND i.zona_id = ?';
      params.push(filters.zona_id);
    }

    // Filtro por ubicación (búsqueda en barrio o dirección)
    if (filters.ubicacion) {
      query += ' AND (i.barrio LIKE ? OR i.direccion LIKE ? OR z.nombre LIKE ?)';
      const searchTerm = `%${filters.ubicacion}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Filtro por barrio específico
    if (filters.barrio) {
      query += ' AND i.barrio LIKE ?';
      params.push(`%${filters.barrio}%`);
    }

    // Filtros de ambientes (min/max)
    if (filters.ambientes_min) {
      query += ' AND i.ambientes >= ?';
      params.push(parseInt(filters.ambientes_min));
    }
    if (filters.ambientes_max) {
      query += ' AND i.ambientes <= ?';
      params.push(parseInt(filters.ambientes_max));
    }

    // Filtros de dormitorios (min/max)
    if (filters.dormitorios_min) {
      query += ' AND i.dormitorios >= ?';
      params.push(parseInt(filters.dormitorios_min));
    }
    if (filters.dormitorios_max) {
      query += ' AND i.dormitorios <= ?';
      params.push(parseInt(filters.dormitorios_max));
    }

    // Filtros de baños (mínimo)
    if (filters.banos_min) {
      query += ' AND i.banos >= ?';
      params.push(parseInt(filters.banos_min));
    }

    // Filtros de cocheras (mínimo)
    if (filters.cocheras_min) {
      query += ' AND i.cocheras >= ?';
      params.push(parseInt(filters.cocheras_min));
    }

    // Filtro de superficie mínima
    if (filters.superficie_min) {
      query += ' AND i.superficie_total_m2 >= ?';
      params.push(parseFloat(filters.superficie_min));
    }

    // Filtro de precio (min/max)
    // Nota: Necesitarías agregar campos de precio a tu tabla inmueble
    if (filters.precio_min) {
      query += ' AND i.precio >= ?';
      params.push(parseFloat(filters.precio_min));
    }
    if (filters.precio_max) {
      query += ' AND i.precio <= ?';
      params.push(parseFloat(filters.precio_max));
    }

    // Filtro de antigüedad
    if (filters.antiguedad) {
      if (filters.antiguedad === 'estrenar') {
        query += ' AND i.antiguedad_categoria_id = 1'; // A estrenar
      } else if (filters.antiguedad === 'nueva') {
        query += ' AND i.antiguedad_categoria_id IN (1, 2)'; // A estrenar o hasta 5 años
      } else if (filters.antiguedad === 'usada') {
        query += ' AND i.antiguedad_categoria_id > 2'; // Más de 5 años
      }
    }

    query += ' ORDER BY i.created_at DESC';

    console.log('📊 Query SQL:', query);
    console.log('📦 Parámetros:', params);

    const [rows] = await db.query(query, params);
    console.log('✅ Resultados encontrados:', rows.length);
    return rows;
  }

  // Obtener amenidades de un inmueble
  static async getAmenidades(inmuebleId) {
    const [rows] = await db.query(`
      SELECT a.*
      FROM amenidad a
      INNER JOIN inmueble_amenidad ia ON a.id = ia.amenidad_id
      WHERE ia.inmueble_id = ?
    `, [inmuebleId]);
    return rows;
  }

  // Obtener todos los tipos de inmueble
  static async getTipos() {
    const [rows] = await db.query('SELECT * FROM inmueble_tipo ORDER BY nombre');
    return rows;
  }

  // Obtener todas las zonas
  static async getZonas() {
    const [rows] = await db.query('SELECT * FROM zona ORDER BY nombre');
    return rows;
  }

  // Obtener todas las disposiciones
  static async getDisposiciones() {
    const [rows] = await db.query('SELECT * FROM disposicion ORDER BY nombre');
    return rows;
  }

  // Obtener todas las categorías de antigüedad
  static async getAntiguedades() {
    const [rows] = await db.query('SELECT * FROM antiguedad_categoria ORDER BY id');
    return rows;
  }

  // Obtener todas las amenidades disponibles
  static async getAllAmenidades() {
    const [rows] = await db.query('SELECT * FROM amenidad ORDER BY nombre');
    return rows;
  }

  // Agregar amenidades a un inmueble
  static async addAmenidades(inmuebleId, amenidadesIds) {
    const values = amenidadesIds.map(amenidadId => [inmuebleId, amenidadId]);
    await db.query(
      'INSERT INTO inmueble_amenidad (inmueble_id, amenidad_id) VALUES ?',
      [values]
    );
  }

  // Eliminar todas las amenidades de un inmueble
  static async removeAllAmenidades(inmuebleId) {
    await db.query(
      'DELETE FROM inmueble_amenidad WHERE inmueble_id = ?',
      [inmuebleId]
    );
  }
}

module.exports = Inmueble;
