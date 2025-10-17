const db = require('../config/database');

class Alquiler {
  // Obtener todos los alquileres
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        a.*,
        i.direccion,
        i.descripcion as inmueble_descripcion,
        it.nombre as tipo_inmueble,
        p_inquilino.nombre as inquilino_nombre,
        p_inquilino.apellidos as inquilino_apellido
      FROM alquiler a
      INNER JOIN inmueble i ON a.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN persona p_inquilino ON a.inquilino_id = p_inquilino.id
      ORDER BY a.fecha_inicio DESC
    `);
    return rows;
  }

  // Obtener alquiler por ID
  static async getById(inmuebleId, nroAlquiler) {
    const [rows] = await db.query(`
      SELECT 
        a.*,
        i.direccion,
        i.descripcion as inmueble_descripcion,
        it.nombre as tipo_inmueble,
        p_inquilino.nombre as inquilino_nombre,
        p_inquilino.apellidos as inquilino_apellido,
        p_inquilino.dni as inquilino_dni,
        p_inquilino.movil as inquilino_telefono
      FROM alquiler a
      INNER JOIN inmueble i ON a.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN persona p_inquilino ON a.inquilino_id = p_inquilino.id
      WHERE a.inmueble_id = ? AND a.nro_alquiler = ?
    `, [inmuebleId, nroAlquiler]);
    return rows[0];
  }

  // Obtener alquileres activos
  static async getActivos() {
    const [rows] = await db.query(`
      SELECT 
        a.*,
        i.direccion,
        it.nombre as tipo_inmueble,
        p.nombre as inquilino_nombre,
        p.apellidos as inquilino_apellido
      FROM alquiler a
      INNER JOIN inmueble i ON a.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN persona p ON a.inquilino_id = p.id
      WHERE a.estado = 'VIGENTE'
      ORDER BY a.fecha_inicio DESC
    `);
    return rows;
  }

  // Crear nuevo alquiler
  static async create(alquilerData) {
    const [result] = await db.query(
      'INSERT INTO alquiler SET ?',
      [alquilerData]
    );
    return result.insertId;
  }

  // Actualizar alquiler
  static async update(id, alquilerData) {
    const [result] = await db.query(
      'UPDATE alquiler SET ? WHERE id = ?',
      [alquilerData, id]
    );
    return result.affectedRows;
  }

  // Eliminar alquiler
  static async delete(id) {
    const [result] = await db.query('DELETE FROM alquiler WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Obtener pagos de un alquiler
  static async getPagos(alquilerId) {
    const [rows] = await db.query(`
      SELECT *
      FROM pago_alquiler
      WHERE alquiler_id = ?
      ORDER BY fecha_pago DESC
    `, [alquilerId]);
    return rows;
  }

  // Registrar pago de alquiler
  static async registrarPago(pagoData) {
    const [result] = await db.query(
      'INSERT INTO pago_alquiler SET ?',
      [pagoData]
    );
    return result.insertId;
  }
}

module.exports = Alquiler;
