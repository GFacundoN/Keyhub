const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  // Obtener todos los usuarios
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        u.id,
        u.email,
        u.is_active as activo,
        u.created_at as fecha_creacion,
        p.nombre,
        p.apellidos as apellido,
        p.movil as telefono,
        p.dni
      FROM usuario u
      LEFT JOIN persona p ON u.persona_id = p.id
      ORDER BY u.created_at DESC
    `);
    return rows;
  }

  // Obtener usuario por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        u.*,
        p.nombre,
        p.apellidos as apellido,
        p.movil as telefono,
        p.dni
      FROM usuario u
      LEFT JOIN persona p ON u.persona_id = p.id
      WHERE u.id = ?
    `, [id]);
    return rows[0];
  }

  // Obtener usuario por email (usado como username)
  static async getByUsername(email) {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Obtener usuario por email
  static async getByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Crear nuevo usuario
  static async create(userData) {
    // Hash de la contraseña
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password_hash = await bcrypt.hash(userData.password, salt);
      delete userData.password;
    }

    const [result] = await db.query(
      'INSERT INTO usuario SET ?',
      [userData]
    );
    return result.insertId;
  }

  // Actualizar usuario
  static async update(id, userData) {
    // Si se actualiza la contraseña, hashearla
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password_hash = await bcrypt.hash(userData.password, salt);
      delete userData.password;
    }

    const [result] = await db.query(
      'UPDATE usuario SET ? WHERE id = ?',
      [userData, id]
    );
    return result.affectedRows;
  }

  // Eliminar usuario
  static async delete(id) {
    const [result] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Obtener roles de un usuario
  static async getRoles(usuarioId) {
    const [rows] = await db.query(`
      SELECT r.*
      FROM rol_app r
      INNER JOIN usuario_rol_app ur ON r.id = ur.rol_app_id
      WHERE ur.usuario_id = ?
    `, [usuarioId]);
    return rows;
  }

  // Asignar rol a usuario
  static async assignRole(usuarioId, rolId) {
    const [result] = await db.query(
      'INSERT INTO usuario_rol_app (usuario_id, rol_app_id) VALUES (?, ?)',
      [usuarioId, rolId]
    );
    return result.insertId;
  }

  // Verificar si usuario tiene un rol específico
  static async hasRole(usuarioId, rolNombre) {
    const [rows] = await db.query(`
      SELECT COUNT(*) as count
      FROM usuario_rol_app ur
      INNER JOIN rol_app r ON ur.rol_app_id = r.id
      WHERE ur.usuario_id = ? AND r.nombre = ?
    `, [usuarioId, rolNombre]);
    return rows[0].count > 0;
  }
}

module.exports = Usuario;
