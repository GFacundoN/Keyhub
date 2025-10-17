-- =========================================================
-- DATOS DE PRUEBA PARA KEYHUB - VERSIÓN SIMPLIFICADA
-- =========================================================
USE inmobiliaria;

-- =========================================================
-- 1. USUARIOS DE PRUEBA (Password: 123456 para todos)
-- =========================================================

-- Hash bcrypt de "123456": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Limpiar usuarios existentes (opcional)
-- Desactivar modo seguro temporalmente
SET SQL_SAFE_UPDATES = 0;

DELETE FROM usuario_rol_app;
DELETE FROM usuario;

-- Insertar usuarios
INSERT INTO usuario (id, email, password_hash, is_active) VALUES
  (1, 'admin@keyhub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),
  (2, 'agente@keyhub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),
  (3, 'usuario@keyhub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1);

-- Asignar roles
INSERT INTO usuario_rol_app (usuario_id, rol_app_id) VALUES
  (1, 1), -- admin es admin
  (2, 2), -- agente es agente
  (2, 3), -- agente también es usuario
  (3, 3); -- usuario es usuario

-- =========================================================
-- 2. INMUEBLES DE EJEMPLO
-- =========================================================

-- Inmueble 1 - Departamento en Puerto Madero
INSERT INTO inmueble (
  tipo_id, codigo_inmueble, zona_id, provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id, anio_construccion, descripcion, created_at
) VALUES (
  1, 'DEPTO-001', 5, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Av. Alicia Moreau de Justo 1234',
  85.50, 75.00, 3, 2, 2, 1,
  1, 1, 2023,
  'Hermoso departamento a estrenar en Puerto Madero con vista al río. Cuenta con amplios ambientes, cocina integrada, 2 dormitorios en suite, balcón con parrilla y cochera cubierta.',
  NOW()
);

-- Inmueble 2 - Casa en Belgrano
INSERT INTO inmueble (
  tipo_id, codigo_inmueble, zona_id, provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id, anio_construccion, descripcion, created_at
) VALUES (
  2, 'CASA-001', 3, 'Buenos Aires', 'CABA', 'Belgrano', 'Calle Juramento 3456',
  250.00, 180.00, 5, 4, 3, 2,
  1, 2, 2019,
  'Espectacular casa en Belgrano con jardín y parrilla. 4 dormitorios (3 en suite), living-comedor amplio, cocina equipada, lavadero, cochera para 2 autos.',
  DATE_SUB(NOW(), INTERVAL 2 DAY)
);

-- Inmueble 3 - Departamento en Palermo
INSERT INTO inmueble (
  tipo_id, codigo_inmueble, zona_id, provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id, anio_construccion, descripcion, created_at
) VALUES (
  1, 'DEPTO-002', 2, 'Buenos Aires', 'CABA', 'Palermo', 'Av. Santa Fe 4567',
  65.00, 60.00, 2, 1, 1, 0,
  1, 2, 2020,
  'Lindo 2 ambientes en Palermo Hollywood. Living-comedor con cocina integrada, dormitorio con placard, baño completo y balcón. Edificio con ascensor.',
  DATE_SUB(NOW(), INTERVAL 5 DAY)
);

-- Inmueble 4 - Local comercial en Centro
INSERT INTO inmueble (
  tipo_id, codigo_inmueble, zona_id, provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id, anio_construccion, descripcion, created_at
) VALUES (
  3, 'LOCAL-001', 1, 'Buenos Aires', 'CABA', 'Centro', 'Av. Corrientes 1234',
  120.00, 120.00, NULL, NULL, 1, 0,
  1, 3, 2010,
  'Local comercial sobre Av. Corrientes con gran vidriera. Planta libre de 120m2, baño, depósito y entrepiso. Excelente ubicación.',
  DATE_SUB(NOW(), INTERVAL 7 DAY)
);

-- Inmueble 5 - Departamento en Recoleta
INSERT INTO inmueble (
  tipo_id, codigo_inmueble, zona_id, provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id, anio_construccion, descripcion, created_at
) VALUES (
  1, 'DEPTO-003', 4, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Callao 1890',
  95.00, 90.00, 4, 3, 2, 1,
  1, 3, 2008,
  'Amplio 4 ambientes en Recoleta. 3 dormitorios con placards, 2 baños (1 en suite), living-comedor, cocina separada, balcón corrido. Muy luminoso.',
  DATE_SUB(NOW(), INTERVAL 10 DAY)
);

-- =========================================================
-- 3. AMENIDADES DE LOS INMUEBLES
-- =========================================================

-- Inmueble 1 (Puerto Madero)
INSERT INTO inmueble_amenidad (inmueble_id, amenidad_id) VALUES
  (1, 1),  -- Pileta
  (1, 2),  -- Gimnasio
  (1, 3),  -- Parrilla
  (1, 4),  -- Seguridad 24hs
  (1, 5),  -- Ascensor
  (1, 7),  -- Aire acondicionado
  (1, 9),  -- Cochera cubierta
  (1, 10); -- Balcón

-- Inmueble 2 (Casa Belgrano)
INSERT INTO inmueble_amenidad (inmueble_id, amenidad_id) VALUES
  (2, 3),  -- Parrilla
  (2, 6),  -- Calefacción
  (2, 7),  -- Aire acondicionado
  (2, 9),  -- Cochera cubierta
  (2, 12); -- Jardín

-- Inmueble 3 (Palermo)
INSERT INTO inmueble_amenidad (inmueble_id, amenidad_id) VALUES
  (3, 5),  -- Ascensor
  (3, 6),  -- Calefacción
  (3, 10); -- Balcón

-- =========================================================
-- RESUMEN
-- =========================================================
SELECT '✅ Datos de prueba insertados correctamente!' as Resultado;
SELECT '' as '';
SELECT '📋 USUARIOS CREADOS:' as Info;
SELECT email, 'Password: 123456' as password, 
  CASE 
    WHEN email = 'admin@keyhub.com' THEN 'ADMIN (puede crear inmuebles)'
    WHEN email = 'agente@keyhub.com' THEN 'AGENTE (puede crear inmuebles)'
    ELSE 'USUARIO (solo puede ver)'
  END as rol
FROM usuario
ORDER BY id;

SELECT '' as '';
SELECT '🏠 INMUEBLES CREADOS:' as Info;
SELECT id, codigo_inmueble, direccion, barrio FROM inmueble ORDER BY created_at DESC;

-- Reactivar modo seguro
SET SQL_SAFE_UPDATES = 1;
