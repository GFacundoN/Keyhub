-- Script para resetear inmuebles y agregar datos de ejemplo completos
USE inmobiliaria;

-- 1. LIMPIAR DATOS EXISTENTES
-- Desactivar verificación de foreign keys temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar datos de tablas relacionadas
DELETE FROM inmueble_amenidad;
DELETE FROM compra;
DELETE FROM alquiler;
DELETE FROM visita;
DELETE FROM consulta;

-- Eliminar inmuebles
DELETE FROM inmueble;

-- Reactivar verificación de foreign keys
SET FOREIGN_KEY_CHECKS = 1;

-- Resetear auto_increment
ALTER TABLE inmueble AUTO_INCREMENT = 1;

-- 2. INSERTAR INMUEBLES DE EJEMPLO

-- ========================================
-- INMUEBLES EN VENTA
-- ========================================

-- Departamento en Venta - Belgrano (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'venta', 120000, 'USD', 'INM-V-001', 3,
  'Buenos Aires', 'CABA', 'Belgrano', 'Av. Cabildo 1234',
  85.5, 75.0,
  3, 2, 2, 1,
  1, 2,
  'Hermoso departamento de 3 ambientes en el corazón de Belgrano. Cuenta con amplios espacios, mucha luz natural y excelente ubicación cerca de transporte y comercios.',
  TRUE
);

-- Casa en Venta - Palermo (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  2, 'venta', 450000, 'USD', 'INM-V-002', 2,
  'Buenos Aires', 'CABA', 'Palermo', 'Av. Santa Fe 4567',
  250.0, 200.0,
  5, 4, 3, 2,
  2, 1,
  'Increíble casa en Palermo con jardín y quincho. Ideal para familias. Amplios ambientes, cocina moderna y excelente estado de conservación.',
  TRUE
);

-- Departamento en Venta - Centro (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'venta', 75000000, 'ARS', 'INM-V-003', 1,
  'Buenos Aires', 'CABA', 'Centro', 'Av. Corrientes 1890',
  65.0, 60.0,
  2, 1, 1, 0,
  1, 3,
  'Departamento de 2 ambientes en pleno centro porteño. Perfecto para inversión o primera vivienda. Cerca de todo.',
  TRUE
);

-- Departamento en Venta - Puerto Madero (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'venta', 280000, 'USD', 'INM-V-004', 5,
  'Buenos Aires', 'CABA', 'Puerto Madero', 'Juana Manso 555',
  120.0, 110.0,
  4, 3, 2, 2,
  1, 1,
  'Espectacular departamento en Puerto Madero con vista al río. Amenities de primer nivel: gimnasio, piscina, sum y seguridad 24hs.',
  TRUE
);

-- Local Comercial en Venta - Centro (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  3, 'venta', 95000, 'USD', 'INM-V-005', 1,
  'Buenos Aires', 'CABA', 'Centro', 'Florida 777',
  45.0, 45.0,
  1, 0, 1, 0,
  3, 2,
  'Local comercial en zona peatonal con alta circulación. Ideal para comercio minorista. Excelente vidriera.',
  TRUE
);

-- ========================================
-- INMUEBLES EN ALQUILER
-- ========================================

-- Departamento en Alquiler - Belgrano (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'alquiler', 350000, 'ARS', 'INM-A-001', 3,
  'Buenos Aires', 'CABA', 'Belgrano', 'Cabildo 2345',
  70.0, 65.0,
  2, 1, 1, 0,
  1, 2,
  'Monoambiente amplio en Belgrano. Luminoso, con balcón y cocina equipada. Expensas bajas.',
  TRUE
);

-- Casa en Alquiler - Palermo (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  2, 'alquiler', 2500, 'USD', 'INM-A-002', 2,
  'Buenos Aires', 'CABA', 'Palermo', 'Gorriti 5678',
  180.0, 150.0,
  4, 3, 2, 1,
  2, 2,
  'Casa en Palermo Soho. Estilo moderno con patio y parrilla. Ideal para familias o profesionales.',
  TRUE
);

-- Departamento en Alquiler - Centro (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'alquiler', 280000, 'ARS', 'INM-A-003', 1,
  'Buenos Aires', 'CABA', 'Centro', 'Av. de Mayo 1234',
  55.0, 50.0,
  2, 1, 1, 0,
  1, 3,
  'Departamento céntrico, perfecto para estudiantes o profesionales. Cerca de subte y colectivos.',
  TRUE
);

-- Departamento en Alquiler - Puerto Madero (USD)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'alquiler', 1800, 'USD', 'INM-A-004', 5,
  'Buenos Aires', 'CABA', 'Puerto Madero', 'Macacha Güemes 351',
  95.0, 90.0,
  3, 2, 2, 1,
  1, 1,
  'Departamento de lujo en Puerto Madero. Vista al río, amenities completos y seguridad 24hs.',
  TRUE
);

-- Local Comercial en Alquiler - Centro (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  3, 'alquiler', 450000, 'ARS', 'INM-A-005', 1,
  'Buenos Aires', 'CABA', 'Centro', 'Lavalle 888',
  60.0, 60.0,
  2, 0, 1, 0,
  3, 2,
  'Local comercial en galería comercial. Gran flujo de gente. Ideal para oficina o comercio.',
  TRUE
);

-- Departamento en Alquiler - Belgrano (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  1, 'alquiler', 420000, 'ARS', 'INM-A-006', 3,
  'Buenos Aires', 'CABA', 'Belgrano', 'Juramento 3456',
  80.0, 75.0,
  3, 2, 2, 1,
  1, 2,
  'Amplio 3 ambientes en Belgrano C. Luminoso, con balcón y cochera. Edificio con amenities.',
  TRUE
);

-- Casa en Alquiler - Palermo (ARS)
INSERT INTO inmueble (
  tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id,
  provincia, ciudad_localidad, barrio, direccion,
  superficie_total_m2, superficie_cubierta_m2,
  ambientes, dormitorios, banos, cocheras,
  disposicion_id, antiguedad_categoria_id,
  descripcion, disponible
) VALUES (
  2, 'alquiler', 650000, 'ARS', 'INM-A-007', 2,
  'Buenos Aires', 'CABA', 'Palermo', 'Thames 2222',
  150.0, 120.0,
  4, 3, 2, 1,
  2, 2,
  'Casa tipo PH en Palermo Hollywood. Patio con deck y parrilla. Muy luminosa.',
  TRUE
);

-- 3. VERIFICAR DATOS INSERTADOS
SELECT 
  id,
  tipo_operacion,
  CONCAT(moneda, ' ', FORMAT(precio, 0, 'es_AR')) as precio_formateado,
  barrio,
  direccion,
  ambientes,
  dormitorios,
  disponible
FROM inmueble
ORDER BY tipo_operacion, barrio;

-- Resumen por tipo de operación
SELECT 
  tipo_operacion,
  COUNT(*) as cantidad,
  AVG(precio) as precio_promedio,
  MIN(precio) as precio_minimo,
  MAX(precio) as precio_maximo
FROM inmueble
GROUP BY tipo_operacion;
