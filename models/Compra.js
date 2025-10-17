const db = require('../config/database');

class Compra {
  // Obtener todas las compras
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        c.*,
        i.direccion,
        i.descripcion as inmueble_descripcion,
        it.nombre as tipo_inmueble
      FROM compra c
      INNER JOIN inmueble i ON c.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.inmueble_tipo_id = it.id
      ORDER BY c.fecha_escritura DESC
    `);
    return rows;
  }

  // Obtener compra por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        c.*,
        i.direccion,
        i.descripcion as inmueble_descripcion,
        it.nombre as tipo_inmueble
      FROM compra c
      INNER JOIN inmueble i ON c.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.inmueble_tipo_id = it.id
      WHERE c.id = ?
    `, [id]);
    return rows[0];
  }

  // Crear nueva compra
  static async create(compraData) {
    const [result] = await db.query(
      'INSERT INTO compra SET ?',
      [compraData]
    );
    return result.insertId;
  }

  // Actualizar compra
  static async update(id, compraData) {
    const [result] = await db.query(
      'UPDATE compra SET ? WHERE id = ?',
      [compraData, id]
    );
    return result.affectedRows;
  }

  // Eliminar compra
  static async delete(id) {
    const [result] = await db.query('DELETE FROM compra WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Obtener titulares de una compra
  static async getTitulares(compraId) {
    const [rows] = await db.query(`
      SELECT 
        ct.*,
        p.nombre,
        p.apellido,
        p.dni,
        p.telefono,
        p.email
      FROM compra_titular ct
      INNER JOIN persona p ON ct.persona_id = p.id
      WHERE ct.compra_id = ?
    `, [compraId]);
    return rows;
  }

  // Agregar titular a una compra
  static async addTitular(titularData) {
    const [result] = await db.query(
      'INSERT INTO compra_titular SET ?',
      [titularData]
    );
    return result.insertId;
  }

  // Eliminar titular de una compra
  static async removeTitular(compraId, personaId) {
    const [result] = await db.query(
      'DELETE FROM compra_titular WHERE compra_id = ? AND persona_id = ?',
      [compraId, personaId]
    );
    return result.affectedRows;
  }
}

module.exports = Compra;
