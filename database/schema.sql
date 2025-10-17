-- KeyHub Database Schema
-- Base de datos para sistema de gestión de inmuebles

CREATE DATABASE IF NOT EXISTS keyhub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE keyhub;

-- Tabla: inmueble_tipo
CREATE TABLE IF NOT EXISTS inmueble_tipo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) UNIQUE NOT NULL COMMENT 'Departamento, Local, Garaje, Casa, etc.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: zona
CREATE TABLE IF NOT EXISTS zona (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: antiguedad_categoria
CREATE TABLE IF NOT EXISTS antiguedad_categoria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: disposicion
CREATE TABLE IF NOT EXISTS disposicion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL COMMENT 'Frente, Contrafrente, Lateral, etc.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: amenidad
CREATE TABLE IF NOT EXISTS amenidad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: persona_rol
CREATE TABLE IF NOT EXISTS persona_rol (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL COMMENT 'Propietario, Inquilino, Comprador, etc.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: persona
CREATE TABLE IF NOT EXISTS persona (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  persona_rol_id INT,
  FOREIGN KEY (persona_rol_id) REFERENCES persona_rol(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  persona_id INT,
  FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: rol_app
CREATE TABLE IF NOT EXISTS rol_app (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) UNIQUE NOT NULL COMMENT 'admin, usuario, agente, etc.',
  descripcion TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: usuario_rol_app
CREATE TABLE IF NOT EXISTS usuario_rol_app (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  rol_app_id INT NOT NULL,
  fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (rol_app_id) REFERENCES rol_app(id) ON DELETE CASCADE,
  UNIQUE KEY unique_usuario_rol (usuario_id, rol_app_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: inmueble
CREATE TABLE IF NOT EXISTS inmueble (
  id INT PRIMARY KEY AUTO_INCREMENT,
  direccion VARCHAR(255) NOT NULL,
  descripcion TEXT,
  inmueble_tipo_id INT,
  zona_id INT,
  antiguedad_categoria_id INT,
  disposicion_id INT,
  disponible BOOLEAN DEFAULT TRUE,
  fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inmueble_tipo_id) REFERENCES inmueble_tipo(id) ON DELETE SET NULL,
  FOREIGN KEY (zona_id) REFERENCES zona(id) ON DELETE SET NULL,
  FOREIGN KEY (antiguedad_categoria_id) REFERENCES antiguedad_categoria(id) ON DELETE SET NULL,
  FOREIGN KEY (disposicion_id) REFERENCES disposicion(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: inmueble_amenidad (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS inmueble_amenidad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL,
  amenidad_id INT NOT NULL,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE,
  FOREIGN KEY (amenidad_id) REFERENCES amenidad(id) ON DELETE CASCADE,
  UNIQUE KEY unique_inmueble_amenidad (inmueble_id, amenidad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: alquiler
CREATE TABLE IF NOT EXISTS alquiler (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL,
  inquilino_id INT,
  precio_mensual DECIMAL(10, 2) NOT NULL,
  deposito_garantia DECIMAL(10, 2),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  contrato_url VARCHAR(255),
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE,
  FOREIGN KEY (inquilino_id) REFERENCES persona(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: pago_alquiler
CREATE TABLE IF NOT EXISTS pago_alquiler (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alquiler_id INT NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_pago DATE NOT NULL,
  mes_correspondiente DATE NOT NULL,
  comprobante_url VARCHAR(255),
  FOREIGN KEY (alquiler_id) REFERENCES alquiler(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: compra
CREATE TABLE IF NOT EXISTS compra (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL,
  precio_venta DECIMAL(12, 2) NOT NULL,
  fecha_escritura DATE,
  escritura_url VARCHAR(255),
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: compra_titular (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS compra_titular (
  id INT PRIMARY KEY AUTO_INCREMENT,
  compra_id INT NOT NULL,
  persona_id INT NOT NULL,
  porcentaje_propiedad DECIMAL(5, 2) DEFAULT 100.00,
  FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
  FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: visita
CREATE TABLE IF NOT EXISTS visita (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL,
  persona_id INT,
  fecha_visita DATETIME NOT NULL,
  observaciones TEXT,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE,
  FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: session_refresh (para manejo de sesiones)
CREATE TABLE IF NOT EXISTS session_refresh (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  fecha_expiracion DATETIME NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tablas especializadas por tipo de inmueble (herencia)

-- Tabla: departamento
CREATE TABLE IF NOT EXISTS departamento (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL UNIQUE,
  piso INT,
  numero VARCHAR(10),
  ambientes INT,
  superficie_cubierta DECIMAL(8, 2),
  balcon BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: casa
CREATE TABLE IF NOT EXISTS casa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL UNIQUE,
  ambientes INT,
  superficie_cubierta DECIMAL(8, 2),
  superficie_terreno DECIMAL(8, 2),
  jardin BOOLEAN DEFAULT FALSE,
  cochera BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: local
CREATE TABLE IF NOT EXISTS local (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL UNIQUE,
  superficie DECIMAL(8, 2),
  vidriera BOOLEAN DEFAULT FALSE,
  baño BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: garaje
CREATE TABLE IF NOT EXISTS garaje (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT NOT NULL UNIQUE,
  capacidad_vehiculos INT DEFAULT 1,
  tipo VARCHAR(50) COMMENT 'Cubierto, Descubierto, Semi-cubierto',
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: anunciante_tipo
CREATE TABLE IF NOT EXISTS anunciante_tipo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL COMMENT 'Propietario, Inmobiliaria, etc.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos iniciales

-- Tipos de inmueble
INSERT INTO inmueble_tipo (nombre) VALUES 
  ('Departamento'),
  ('Casa'),
  ('Local'),
  ('Garaje');

-- Zonas
INSERT INTO zona (nombre, descripcion) VALUES 
  ('Centro', 'Zona céntrica de la ciudad'),
  ('Norte', 'Zona norte'),
  ('Sur', 'Zona sur'),
  ('Este', 'Zona este'),
  ('Oeste', 'Zona oeste');

-- Categorías de antigüedad
INSERT INTO antiguedad_categoria (nombre) VALUES 
  ('A estrenar'),
  ('Menos de 5 años'),
  ('5 a 10 años'),
  ('10 a 20 años'),
  ('Más de 20 años');

-- Disposiciones
INSERT INTO disposicion (nombre) VALUES 
  ('Frente'),
  ('Contrafrente'),
  ('Lateral'),
  ('Interno');

-- Amenidades
INSERT INTO amenidad (nombre, descripcion) VALUES 
  ('Pileta', 'Piscina'),
  ('Gimnasio', 'Sala de gimnasio'),
  ('Parrilla', 'Área de parrilla'),
  ('Seguridad 24hs', 'Seguridad las 24 horas'),
  ('Ascensor', 'Ascensor en el edificio'),
  ('Calefacción', 'Sistema de calefacción'),
  ('Aire acondicionado', 'Sistema de aire acondicionado'),
  ('Lavadero', 'Área de lavadero');

-- Roles de persona
INSERT INTO persona_rol (nombre) VALUES 
  ('Propietario'),
  ('Inquilino'),
  ('Comprador'),
  ('Vendedor');

-- Roles de aplicación
INSERT INTO rol_app (nombre, descripcion) VALUES 
  ('admin', 'Administrador del sistema'),
  ('agente', 'Agente inmobiliario'),
  ('usuario', 'Usuario regular');

-- Tipos de anunciante
INSERT INTO anunciante_tipo (nombre) VALUES 
  ('Propietario'),
  ('Inmobiliaria'),
  ('Desarrollador');

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_inmueble_tipo ON inmueble(inmueble_tipo_id);
CREATE INDEX idx_inmueble_zona ON inmueble(zona_id);
CREATE INDEX idx_inmueble_disponible ON inmueble(disponible);
CREATE INDEX idx_usuario_username ON usuario(username);
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_persona_dni ON persona(dni);
CREATE INDEX idx_alquiler_fecha ON alquiler(fecha_inicio, fecha_fin);

COMMIT;
