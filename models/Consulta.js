const db = require('../config/database');

class Consulta {
  // Crear nueva consulta/solicitud
  static async create(consultaData) {
    const [result] = await db.query(
      'INSERT INTO consulta SET ?',
      [consultaData]
    );
    return result.insertId;
  }

  // Obtener todas las consultas
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        c.*,
        i.direccion as inmueble_direccion,
        i.codigo_inmueble
      FROM consulta c
      LEFT JOIN inmueble i ON c.inmueble_id = i.id
      ORDER BY c.fecha_consulta DESC
    `);
    return rows;
  }

  // Obtener consulta por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        c.*,
        i.direccion as inmueble_direccion,
        i.codigo_inmueble,
        it.nombre as inmueble_tipo
      FROM consulta c
      LEFT JOIN inmueble i ON c.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      WHERE c.id = ?
    `, [id]);
    return rows[0];
  }

  // Obtener consultas por inmueble
  static async getByInmueble(inmuebleId) {
    const [rows] = await db.query(`
      SELECT c.*
      FROM consulta c
      WHERE c.inmueble_id = ?
      ORDER BY c.fecha_consulta DESC
    `, [inmuebleId]);
    return rows;
  }

  // Obtener consultas por email del usuario
  static async getByUserEmail(email) {
    const [rows] = await db.query(`
      SELECT 
        c.*,
        i.direccion as inmueble_direccion,
        i.codigo_inmueble,
        i.tipo_operacion,
        it.nombre as inmueble_tipo
      FROM consulta c
      LEFT JOIN inmueble i ON c.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      WHERE c.email = ?
      ORDER BY c.fecha_consulta DESC
    `, [email]);
    return rows;
  }

  // Actualizar estado de consulta
  static async updateEstado(id, estado) {
    const [result] = await db.query(
      'UPDATE consulta SET estado = ? WHERE id = ?',
      [estado, id]
    );
    return result.affectedRows;
  }

  // Eliminar consulta
  static async delete(id) {
    const [result] = await db.query('DELETE FROM consulta WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Consulta;
