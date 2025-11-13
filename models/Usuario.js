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
    const [rows] = await db.query(`
      SELECT 
        u.*,
        p.nombre,
        p.apellidos,
        p.movil as telefono,
        p.dni
      FROM usuario u
      LEFT JOIN persona p ON u.persona_id = p.id
      WHERE u.email = ?
    `, [email]);
    return rows[0];
  }

  // Obtener usuario por email
  static async getByEmail(email) {
    const [rows] = await db.query(`
      SELECT u.*, p.nombre, p.apellidos 
      FROM usuario u
      LEFT JOIN persona p ON u.persona_id = p.id
      WHERE u.email = ?
    `, [email]);
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

  // Actualizar usuario y su persona asociada
  static async updateWithPersona(usuarioId, usuarioData, personaData) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      // Obtener el usuario actual
      const [usuarios] = await connection.query(
        'SELECT persona_id FROM usuario WHERE id = ?',
        [usuarioId]
      );
      
      if (usuarios.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      const usuario = usuarios[0];
      
      // Manejar datos de persona
      if (usuario.persona_id) {
        // Actualizar persona existente
        // Remover cod_personal para no sobreescribirlo si ya existe
        const { cod_personal, ...personaUpdateData } = personaData;
        await connection.query(
          'UPDATE persona SET ? WHERE id = ?',
          [personaUpdateData, usuario.persona_id]
        );
      } else {
        // Crear nueva persona
        // Asegurarse de que tiene cod_personal
        if (!personaData.cod_personal) {
          personaData.cod_personal = `PER-${Date.now()}`;
        }
        const [personaResult] = await connection.query(
          'INSERT INTO persona SET ?',
          [personaData]
        );
        
        // Asociar persona al usuario
        usuarioData.persona_id = personaResult.insertId;
      }

      // Procesar contraseña si existe
      if (usuarioData.password) {
        const salt = await bcrypt.genSalt(10);
        usuarioData.password_hash = await bcrypt.hash(usuarioData.password, salt);
        delete usuarioData.password;
      }

      // Actualizar usuario
      await connection.query(
        'UPDATE usuario SET ? WHERE id = ?',
        [usuarioData, usuarioId]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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

  // Métodos para Google OAuth
  
  // Obtener usuario por Google ID
  static async getByGoogleId(googleId) {
    const [rows] = await db.query(`
      SELECT u.*, p.nombre, p.apellidos 
      FROM usuario u
      LEFT JOIN persona p ON u.persona_id = p.id
      WHERE u.google_id = ?
    `, [googleId]);
    return rows[0];
  }

  // Vincular cuenta de Google a usuario existente
  static async linkGoogleAccount(usuarioId, googleId, fotoPerfil) {
    const [result] = await db.query(
      'UPDATE usuario SET google_id = ?, foto_perfil = ?, auth_provider = ? WHERE id = ?',
      [googleId, fotoPerfil, 'google', usuarioId]
    );
    return result.affectedRows;
  }

  // Crear usuario desde Google OAuth
  static async createGoogleUser(userData, personaData) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Crear persona primero
      const [personaResult] = await connection.query(
        'INSERT INTO persona SET ?',
        [personaData]
      );
      
      // Crear usuario vinculado a la persona
      userData.persona_id = personaResult.insertId;
      const [usuarioResult] = await connection.query(
        'INSERT INTO usuario SET ?',
        [userData]
      );
      
      await connection.commit();
      return usuarioResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Obtener ID de rol por nombre
  static async getRoleIdByName(rolNombre) {
    const [rows] = await db.query(
      'SELECT id FROM rol_app WHERE nombre = ?',
      [rolNombre]
    );
    return rows[0];
  }

  // Métodos de favoritos

  // Agregar inmueble a favoritos
  static async addFavorito(usuarioId, inmuebleId) {
    try {
      const [result] = await db.query(
        'INSERT INTO favorito (usuario_id, inmueble_id) VALUES (?, ?)',
        [usuarioId, inmuebleId]
      );
      return result.insertId;
    } catch (error) {
      // Si el favorito ya existe, no hacer nada
      if (error.code === 'ER_DUP_ENTRY') {
        return null;
      }
      throw error;
    }
  }

  // Eliminar inmueble de favoritos
  static async removeFavorito(usuarioId, inmuebleId) {
    const [result] = await db.query(
      'DELETE FROM favorito WHERE usuario_id = ? AND inmueble_id = ?',
      [usuarioId, inmuebleId]
    );
    return result.affectedRows;
  }

  // Verificar si un inmueble está en favoritos
  static async isFavorito(usuarioId, inmuebleId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM favorito WHERE usuario_id = ? AND inmueble_id = ?',
      [usuarioId, inmuebleId]
    );
    return rows[0].count > 0;
  }

  // Obtener todos los favoritos de un usuario
  static async getFavoritos(usuarioId) {
    const [rows] = await db.query(`
      SELECT 
        i.*,
        it.nombre as tipo_nombre,
        z.nombre as zona_nombre,
        f.fecha_agregado
      FROM favorito f
      INNER JOIN inmueble i ON f.inmueble_id = i.id
      LEFT JOIN inmueble_tipo it ON i.tipo_id = it.id
      LEFT JOIN zona z ON i.zona_id = z.id
      WHERE f.usuario_id = ?
      ORDER BY f.fecha_agregado DESC
    `, [usuarioId]);
    return rows;
  }

  // Contar favoritos de un usuario
  static async countFavoritos(usuarioId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM favorito WHERE usuario_id = ?',
      [usuarioId]
    );
    return rows[0].count;
  }
}

module.exports = Usuario;
