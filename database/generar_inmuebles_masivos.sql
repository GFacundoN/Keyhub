-- Script para generar inmuebles masivos de ejemplo
-- Ejecuta este script para tener una base de datos completa con muchos inmuebles
USE inmobiliaria;

-- 1. LIMPIAR DATOS EXISTENTES
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM inmueble_amenidad;
DELETE FROM compra;
DELETE FROM alquiler;
DELETE FROM visita;
DELETE FROM consulta;
DELETE FROM inmueble;
SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE inmueble AUTO_INCREMENT = 1;

-- ============================================
-- INMUEBLES EN VENTA (20 propiedades)
-- ============================================

-- DEPARTAMENTOS EN VENTA
INSERT INTO inmueble (tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id, anunciante_tipo_id, provincia, ciudad_localidad, barrio, direccion, superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras, disposicion_id, antiguedad_categoria_id, descripcion, disponible) VALUES
(1, 'venta', 120000, 'USD', 'INM-V-001', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Av. Cabildo 1234', 85.5, 75.0, 3, 2, 2, 1, 1, 2, 'Hermoso departamento de 3 ambientes en el corazón de Belgrano. Cuenta con amplios espacios, mucha luz natural y excelente ubicación cerca de transporte y comercios.', TRUE),
(1, 'venta', 280000, 'USD', 'INM-V-002', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Juana Manso 555', 120.0, 110.0, 4, 3, 2, 2, 1, 1, 'Espectacular departamento en Puerto Madero con vista al río. Amenities de primer nivel: gimnasio, piscina, sum y seguridad 24hs.', TRUE),
(1, 'venta', 75000000, 'ARS', 'INM-V-003', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Av. Corrientes 1890', 65.0, 60.0, 2, 1, 1, 0, 1, 3, 'Departamento de 2 ambientes en pleno centro porteño. Perfecto para inversión o primera vivienda. Cerca de todo.', TRUE),
(1, 'venta', 95000, 'USD', 'INM-V-004', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Av. Santa Fe 2340', 70.0, 65.0, 2, 1, 1, 0, 1, 2, 'Moderno departamento en Palermo. Edificio nuevo con excelentes terminaciones y ubicación privilegiada.', TRUE),
(1, 'venta', 145000, 'USD', 'INM-V-005', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Monroe 4567', 95.0, 85.0, 3, 2, 2, 1, 1, 2, 'Amplio 3 ambientes con balcón. Vista abierta, muy luminoso. Excelente estado de conservación.', TRUE),
(1, 'venta', 89000000, 'ARS', 'INM-V-006', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Callao 890', 78.0, 72.0, 3, 2, 1, 0, 1, 3, 'Departamento clásico en Recoleta. Alto potencial, ideal para refaccionar a gusto.', TRUE),
(1, 'venta', 165000, 'USD', 'INM-V-007', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Las Heras 2134', 105.0, 95.0, 4, 3, 2, 1, 1, 2, 'Elegante departamento en Recoleta. Espacios amplios, pisos de madera y mucha luz natural.', TRUE),
(1, 'venta', 98000, 'USD', 'INM-V-008', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Gorriti 3456', 68.0, 62.0, 2, 1, 1, 0, 1, 1, 'Departamento a estrenar en Palermo Soho. Cocina integrada y diseño moderno.', TRUE),
(1, 'venta', 195000, 'USD', 'INM-V-009', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Macacha Güemes 123', 115.0, 105.0, 4, 3, 3, 2, 1, 1, 'Premium departamento con vista panorámica al río. Piso alto, dos cocheras cubiertas.', TRUE),
(1, 'venta', 68000000, 'ARS', 'INM-V-010', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Tucumán 567', 55.0, 50.0, 2, 1, 1, 0, 1, 3, 'Monoambiente con dormitorio separado. Ideal inversión para alquiler temporario.', TRUE),

-- CASAS EN VENTA
(2, 'venta', 450000, 'USD', 'INM-V-011', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Av. Santa Fe 4567', 250.0, 200.0, 5, 4, 3, 2, 2, 1, 'Increíble casa en Palermo con jardín y quincho. Ideal para familias. Amplios ambientes, cocina moderna y excelente estado de conservación.', TRUE),
(2, 'venta', 380000, 'USD', 'INM-V-012', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Virrey del Pino 2345', 220.0, 180.0, 5, 3, 2, 2, 2, 2, 'Casa reciclada en Belgrano. Patio con parrilla, living comedor amplio y dos plantas.', TRUE),
(2, 'venta', 520000, 'USD', 'INM-V-013', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Thames 1234', 280.0, 230.0, 6, 4, 4, 2, 2, 1, 'Espectacular casa moderna en Palermo Hollywood. Pileta, quincho y dependencia de servicio.', TRUE),
(2, 'venta', 295000, 'USD', 'INM-V-014', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Arenales 1890', 185.0, 150.0, 4, 3, 2, 1, 2, 2, 'Casa PH de dos plantas en Recoleta. Patio interno con deck y parrilla.', TRUE),
(2, 'venta', 620000, 'USD', 'INM-V-015', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Azucena Villaflor 450', 320.0, 270.0, 6, 5, 5, 3, 2, 1, 'Casa de lujo en dique. Vista al río, amenities premium y máxima seguridad.', TRUE),

-- LOCALES COMERCIALES EN VENTA
(3, 'venta', 95000, 'USD', 'INM-V-016', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Florida 777', 45.0, 45.0, 1, 0, 1, 0, 3, 2, 'Local comercial en zona peatonal con alta circulación. Ideal para comercio minorista. Excelente vidriera.', TRUE),
(3, 'venta', 125000, 'USD', 'INM-V-017', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Lavalle 456', 65.0, 65.0, 2, 0, 1, 0, 3, 2, 'Local en galería comercial. Dos ambientes amplios, baño y depósito.', TRUE),
(3, 'venta', 180000, 'USD', 'INM-V-018', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Honduras 3456', 80.0, 80.0, 2, 0, 2, 0, 3, 1, 'Local esquina en Palermo. Gran vidriera, excelente ubicación para gastronomía.', TRUE),
(3, 'venta', 75000, 'USD', 'INM-V-019', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Sarmiento 890', 35.0, 35.0, 1, 0, 1, 0, 3, 3, 'Local comercial compacto. Ideal para oficina o pequeño comercio.', TRUE),
(3, 'venta', 210000, 'USD', 'INM-V-020', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Pueyrredón 1234', 95.0, 95.0, 3, 0, 2, 0, 3, 2, 'Amplio local en Recoleta. Altura 3.5m, ideal para showroom o boutique.', TRUE);

-- ============================================
-- INMUEBLES EN ALQUILER (25 propiedades)
-- ============================================

-- DEPARTAMENTOS EN ALQUILER
INSERT INTO inmueble (tipo_id, tipo_operacion, precio, moneda, codigo_inmueble, zona_id, anunciante_tipo_id, provincia, ciudad_localidad, barrio, direccion, superficie_total_m2, superficie_cubierta_m2, ambientes, dormitorios, banos, cocheras, disposicion_id, antiguedad_categoria_id, descripcion, disponible) VALUES
(1, 'alquiler', 350000, 'ARS', 'INM-A-001', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Cabildo 2345', 70.0, 65.0, 2, 1, 1, 0, 1, 2, 'Monoambiente amplio en Belgrano. Luminoso, con balcón y cocina equipada. Expensas bajas.', TRUE),
(1, 'alquiler', 1800, 'USD', 'INM-A-002', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Macacha Güemes 351', 95.0, 90.0, 3, 2, 2, 1, 1, 1, 'Departamento de lujo en Puerto Madero. Vista al río, amenities completos y seguridad 24hs.', TRUE),
(1, 'alquiler', 280000, 'ARS', 'INM-A-003', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Av. de Mayo 1234', 55.0, 50.0, 2, 1, 1, 0, 1, 3, 'Departamento céntrico, perfecto para estudiantes o profesionales. Cerca de subte y colectivos.', TRUE),
(1, 'alquiler', 420000, 'ARS', 'INM-A-004', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Juramento 3456', 80.0, 75.0, 3, 2, 2, 1, 1, 2, 'Amplio 3 ambientes en Belgrano C. Luminoso, con balcón y cochera. Edificio con amenities.', TRUE),
(1, 'alquiler', 1200, 'USD', 'INM-A-005', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Scalabrini Ortiz 1890', 75.0, 70.0, 2, 1, 1, 0, 1, 1, 'Moderno departamento en Palermo. Edificio nuevo, cocina integrada y diseño contemporáneo.', TRUE),
(1, 'alquiler', 380000, 'ARS', 'INM-A-006', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Ayacucho 1567', 68.0, 62.0, 2, 1, 1, 0, 1, 2, 'Departamento clásico en Recoleta. Techos altos, pisos de madera y mucha luz.', TRUE),
(1, 'alquiler', 1500, 'USD', 'INM-A-007', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Alvear 1234', 90.0, 85.0, 3, 2, 2, 1, 1, 2, 'Elegante departamento sobre avenida. Cochera, balcón y excelente distribución.', TRUE),
(1, 'alquiler', 320000, 'ARS', 'INM-A-008', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Costa Rica 4567', 65.0, 60.0, 2, 1, 1, 0, 1, 2, 'Departamento tipo loft en Palermo Soho. Ideal para jóvenes profesionales.', TRUE),
(1, 'alquiler', 2200, 'USD', 'INM-A-009', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Juana Manso 777', 110.0, 100.0, 4, 3, 2, 2, 1, 1, 'Premium departamento en torre AAA. Piso alto, vista al río y dos cocheras.', TRUE),
(1, 'alquiler', 250000, 'ARS', 'INM-A-010', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Bartolomé Mitre 890', 50.0, 45.0, 1, 1, 1, 0, 1, 3, 'Monoambiente céntrico. Muy luminoso y con excelente ubicación.', TRUE),
(1, 'alquiler', 480000, 'ARS', 'INM-A-011', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Mendoza 2890', 85.0, 80.0, 3, 2, 2, 1, 1, 2, 'Departamento con vista abierta. Tres ambientes amplios, cocina separada y cochera.', TRUE),
(1, 'alquiler', 1400, 'USD', 'INM-A-012', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Ravignani 2345', 78.0, 72.0, 3, 2, 1, 0, 1, 2, 'Departamento reciclado en Palermo. Diseño moderno y excelente ubicación.', TRUE),
(1, 'alquiler', 360000, 'ARS', 'INM-A-013', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Junín 1456', 70.0, 65.0, 2, 1, 1, 0, 1, 3, 'Departamento clásico. Pisos de parquet, techos altos y muy luminoso.', TRUE),
(1, 'alquiler', 1100, 'USD', 'INM-A-014', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Fitz Roy 1789', 68.0, 62.0, 2, 1, 1, 0, 1, 1, 'Departamento a estrenar en Palermo. Cocina integrada y balcón aterrazado.', TRUE),
(1, 'alquiler', 290000, 'ARS', 'INM-A-015', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Diagonal Norte 678', 58.0, 53.0, 2, 1, 1, 0, 1, 3, 'Departamento en diagonal. Ideal para profesionales, cerca de todo.', TRUE),

-- CASAS EN ALQUILER
(2, 'alquiler', 2500, 'USD', 'INM-A-016', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Gorriti 5678', 180.0, 150.0, 4, 3, 2, 1, 2, 2, 'Casa en Palermo Soho. Estilo moderno con patio y parrilla. Ideal para familias o profesionales.', TRUE),
(2, 'alquiler', 650000, 'ARS', 'INM-A-017', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Thames 2222', 150.0, 120.0, 4, 3, 2, 1, 2, 2, 'Casa tipo PH en Palermo Hollywood. Patio con deck y parrilla. Muy luminosa.', TRUE),
(2, 'alquiler', 3200, 'USD', 'INM-A-018', 3, 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Olleros 2890', 200.0, 170.0, 5, 4, 3, 2, 2, 2, 'Amplia casa en Belgrano. Jardín, parrilla y garage para dos autos.', TRUE),
(2, 'alquiler', 780000, 'ARS', 'INM-A-019', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Posadas 1567', 165.0, 140.0, 4, 3, 2, 1, 2, 2, 'Casa PH en Recoleta. Dos plantas, patio interno y excelente ubicación.', TRUE),
(2, 'alquiler', 4500, 'USD', 'INM-A-020', 5, 1, 'Buenos Aires', 'CABA', 'Puerto Madero', 'Azucena Villaflor 890', 250.0, 220.0, 6, 4, 4, 3, 2, 1, 'Casa moderna en dique. Pileta, quincho y vista al río. Máximo confort.', TRUE),

-- LOCALES COMERCIALES EN ALQUILER
(3, 'alquiler', 450000, 'ARS', 'INM-A-021', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Lavalle 888', 60.0, 60.0, 2, 0, 1, 0, 3, 2, 'Local comercial en galería comercial. Gran flujo de gente. Ideal para oficina o comercio.', TRUE),
(3, 'alquiler', 1800, 'USD', 'INM-A-022', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Florida 1234', 75.0, 75.0, 2, 0, 2, 0, 3, 2, 'Local sobre peatonal Florida. Excelente vidriera y ubicación premium.', TRUE),
(3, 'alquiler', 580000, 'ARS', 'INM-A-023', 2, 1, 'Buenos Aires', 'CABA', 'Palermo', 'Honduras 2890', 55.0, 55.0, 1, 0, 1, 0, 3, 1, 'Local nuevo en Palermo. Ideal para gastronomía o retail. Gran vidriera.', TRUE),
(3, 'alquiler', 1200, 'USD', 'INM-A-024', 4, 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Santa Fe 2345', 85.0, 85.0, 2, 0, 2, 0, 3, 2, 'Amplio local sobre Santa Fe. Altura 3.5m, ideal para showroom.', TRUE),
(3, 'alquiler', 380000, 'ARS', 'INM-A-025', 1, 1, 'Buenos Aires', 'CABA', 'Centro', 'Corrientes 2134', 48.0, 48.0, 1, 0, 1, 0, 3, 3, 'Local sobre Corrientes. Buena vidriera y excelente ubicación.', TRUE);

-- ============================================
-- RESUMEN Y VERIFICACIÓN
-- ============================================

-- Mostrar resumen de inmuebles insertados
SELECT 
  tipo_operacion,
  COUNT(*) as cantidad,
  AVG(precio) as precio_promedio,
  MIN(precio) as precio_minimo,
  MAX(precio) as precio_maximo
FROM inmueble
GROUP BY tipo_operacion;

-- Mostrar por tipo y operación
SELECT 
  t.nombre as tipo,
  i.tipo_operacion,
  COUNT(*) as cantidad
FROM inmueble i
JOIN tipo_inmueble t ON i.tipo_id = t.id
GROUP BY t.nombre, i.tipo_operacion
ORDER BY i.tipo_operacion, t.nombre;

-- Mostrar todos los inmuebles insertados
SELECT 
  id,
  codigo_inmueble,
  tipo_operacion,
  CONCAT(moneda, ' ', FORMAT(precio, 0, 'es_AR')) as precio,
  barrio,
  direccion,
  CONCAT(ambientes, ' amb') as ambientes,
  disponible
FROM inmueble
ORDER BY tipo_operacion, barrio, precio;

-- Mensaje final
SELECT 'SCRIPT COMPLETADO! Se han insertado 45 inmuebles (20 ventas + 25 alquileres)' as Mensaje;
