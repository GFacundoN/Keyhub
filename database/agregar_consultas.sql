-- =========================================================
-- AGREGAR TABLA DE CONSULTAS (si no existe)
-- =========================================================
USE inmobiliaria;

-- Crear tabla consulta si no existe
CREATE TABLE IF NOT EXISTS consulta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inmueble_id INT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  mensaje TEXT NOT NULL,
  tipo_consulta ENUM('INFORMACION', 'VISITA', 'COTIZACION', 'OTRO') DEFAULT 'INFORMACION',
  estado ENUM('PENDIENTE', 'ATENDIDA', 'CANCELADA') DEFAULT 'PENDIENTE',
  fecha_consulta DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (inmueble_id) REFERENCES inmueble(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunas consultas de ejemplo
INSERT INTO consulta (inmueble_id, nombre, email, telefono, mensaje, tipo_consulta, estado, fecha_consulta) VALUES
  (1, 'Juan Pérez', 'juan.perez@email.com', '+54 11 1234-5678', 'Me interesa conocer más sobre este departamento. ¿Cuándo puedo visitarlo?', 'VISITA', 'PENDIENTE', NOW()),
  (2, 'María González', 'maria.gonzalez@email.com', '+54 11 8765-4321', 'Quisiera saber el precio de alquiler mensual y si acepta mascotas.', 'INFORMACION', 'ATENDIDA', DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (3, 'Carlos Rodríguez', 'carlos.r@email.com', '+54 11 5555-6666', 'Necesito cotización para alquilar este departamento por 2 años.', 'COTIZACION', 'PENDIENTE', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (NULL, 'Ana Martínez', 'ana.martinez@email.com', '+54 11 9999-8888', 'Busco un departamento de 2 ambientes en Palermo. ¿Tienen disponibilidad?', 'INFORMACION', 'PENDIENTE', NOW());

SELECT '✅ Tabla de consultas creada correctamente!' as Resultado;
SELECT '' as '';
SELECT '📋 CONSULTAS DE EJEMPLO:' as Info;
SELECT id, nombre, tipo_consulta, estado, DATE_FORMAT(fecha_consulta, '%d/%m/%Y') as fecha FROM consulta ORDER BY fecha_consulta DESC;
