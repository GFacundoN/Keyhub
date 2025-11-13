const db = require('../config/database');

class Favorito {
  // Obtener favoritos de un usuario con información del inmueble
  static async getByUsuario(usuarioId) {
    const [rows] = await db.query(`
      SELECT 
        f.*,
        i.id as inmueble_id,
        i.codigo_inmueble,
        i.direccion,
        i.precio,
        i.tipo_operacion,
        i.descripcion,
        i.ambientes,
        i.dormitorios,
        i.banos,
        i.superficie_total_m2,
        it.nombre as tipo_nombre
      FROM favorito f
      INNER JOIN inmueble i ON f.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      WHERE f.usuario_id = ?
      ORDER BY f.fecha_agregado DESC
    `, [usuarioId]);
    return rows;
  }

  // Agregar a favoritos
  static async create(usuarioId, inmuebleId) {
    const [result] = await db.query(
      'INSERT INTO favorito (usuario_id, inmueble_id) VALUES (?, ?)',
      [usuarioId, inmuebleId]
    );
    return result.insertId;
  }

  // Eliminar de favoritos
  static async delete(usuarioId, inmuebleId) {
    const [result] = await db.query(
      'DELETE FROM favorito WHERE usuario_id = ? AND inmueble_id = ?',
      [usuarioId, inmuebleId]
    );
    return result.affectedRows;
  }

  // Verificar si un inmueble está en favoritos
  static async exists(usuarioId, inmuebleId) {
    const [rows] = await db.query(
      'SELECT id FROM favorito WHERE usuario_id = ? AND inmueble_id = ?',
      [usuarioId, inmuebleId]
    );
    return rows.length > 0;
  }

  // Contar favoritos de un usuario
  static async countByUsuario(usuarioId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as total FROM favorito WHERE usuario_id = ?',
      [usuarioId]
    );
    return rows[0].total;
  }
}

module.exports = Favorito;
