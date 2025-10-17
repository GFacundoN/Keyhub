const db = require('../config/database');

class Persona {
  // Obtener todas las personas
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        p.*
      FROM persona p
      ORDER BY p.apellidos, p.nombre
    `);
    return rows;
  }

  // Obtener persona por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT p.*
      FROM persona p
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }

  // Obtener persona por DNI
  static async getByDni(dni) {
    const [rows] = await db.query(
      'SELECT * FROM persona WHERE dni = ?',
      [dni]
    );
    return rows[0];
  }

  // Crear nueva persona
  static async create(personaData) {
    const [result] = await db.query(
      'INSERT INTO persona SET ?',
      [personaData]
    );
    return result.insertId;
  }

  // Actualizar persona
  static async update(id, personaData) {
    const [result] = await db.query(
      'UPDATE persona SET ? WHERE id = ?',
      [personaData, id]
    );
    return result.affectedRows;
  }

  // Eliminar persona
  static async delete(id) {
    const [result] = await db.query('DELETE FROM persona WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Obtener personas por rol
  static async getByRol(rol) {
    const [rows] = await db.query(`
      SELECT p.*
      FROM persona p
      INNER JOIN persona_rol pr ON p.id = pr.persona_id
      WHERE pr.rol = ?
    `, [rol]);
    return rows;
  }
}

module.exports = Persona;
