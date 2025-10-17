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
        z.nombre as zona_nombre,
        a.precio_mensual
      FROM inmueble i
      INNER JOIN alquiler a ON i.id = a.inmueble_id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      WHERE a.estado = 'VIGENTE'
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
        z.nombre as zona_nombre,
        c.valor as precio_venta
      FROM inmueble i
      INNER JOIN compra c ON i.id = c.inmueble_id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
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

    if (filters.tipo_id) {
      query += ' AND i.tipo_id = ?';
      params.push(filters.tipo_id);
    }

    if (filters.zona_id) {
      query += ' AND i.zona_id = ?';
      params.push(filters.zona_id);
    }

    if (filters.ambientes) {
      query += ' AND i.ambientes >= ?';
      params.push(filters.ambientes);
    }

    if (filters.dormitorios) {
      query += ' AND i.dormitorios >= ?';
      params.push(filters.dormitorios);
    }

    query += ' ORDER BY i.created_at DESC';

    const [rows] = await db.query(query, params);
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
