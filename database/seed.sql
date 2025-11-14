-- =====================================================
-- SEED DATA PARA KEYHUB - SISTEMA INMOBILIARIO
-- =====================================================
-- USUARIOS DE PRUEBA (password para todos: "password123"):
--
-- USUARIO NORMAL:
--   Email: usuario@keyhub.com
--   Password: password123
--
-- AGENTE INMOBILIARIO:
--   Email: agente@keyhub.com  
--   Password: password123
--
-- ADMINISTRADOR:
--   Email: admin@keyhub.com
--   Password: password123
-- =====================================================

USE `inmobiliaria`;
SET FOREIGN_KEY_CHECKS = 0;

-- Roles de aplicación
INSERT INTO `rol_app` (`id`, `nombre`) VALUES (1, 'usuario'), (2, 'agente'), (3, 'administrador');

-- Tipos de inmuebles
INSERT INTO `inmueble_tipo` (`id`, `nombre`) VALUES (1, 'Departamento'), (2, 'Casa'), (3, 'Local Comercial'), (4, 'Garaje');

-- Zonas geográficas
INSERT INTO `zona` (`id`, `nombre`) VALUES (1, 'Centro'), (2, 'Norte'), (3, 'Sur'), (4, 'Este'), (5, 'Oeste'), (6, 'Zona Residencial'), (7, 'Zona Comercial'), (8, 'Periferia');

-- Categorías de antigüedad
INSERT INTO `antiguedad_categoria` (`id`, `nombre`) VALUES (1, 'A estrenar'), (2, 'Menos de 5 años'), (3, 'Entre 5 y 10 años'), (4, 'Entre 10 y 20 años'), (5, 'Más de 20 años');

-- Tipos de anunciante
INSERT INTO `anunciante_tipo` (`id`, `nombre`) VALUES (1, 'Propietario'), (2, 'Inmobiliaria'), (3, 'Desarrollador');

-- Disposiciones
INSERT INTO `disposicion` (`id`, `nombre`) VALUES (1, 'Frente'), (2, 'Contrafrente'), (3, 'Lateral'), (4, 'Interno');

-- Amenidades
INSERT INTO `amenidad` (`id`, `nombre`) VALUES (1, 'Piscina'), (2, 'Gimnasio'), (3, 'Parrilla'), (4, 'Jardín'), (5, 'Balcón'), (6, 'Terraza'), (7, 'Aire Acondicionado'), (8, 'Calefacción'), (9, 'Seguridad 24hs'), (10, 'Ascensor'), (11, 'Lavadero'), (12, 'Cochera Cubierta');

-- Personas
INSERT INTO `persona` (`id`, `dni`, `cod_personal`, `nombre`, `apellidos`, `tel_fijo`, `movil`) VALUES
(1, '12345678', 'USR001', 'Juan', 'Pérez', '011-4444-5555', '11-2222-3333'),
(2, '23456789', 'AGT001', 'María', 'González', '011-5555-6666', '11-3333-4444'),
(3, '34567890', 'ADM001', 'Carlos', 'Rodríguez', '011-6666-7777', '11-4444-5555'),
(4, '45678901', 'CLI001', 'Ana', 'Martínez', NULL, '11-5555-6666'),
(5, '56789012', 'CLI002', 'Pedro', 'López', '011-7777-8888', '11-6666-7777');

-- Roles de persona
INSERT INTO `persona_rol` (`persona_id`, `rol`) VALUES (1, 'CLIENTE'), (2, 'TRABAJADOR'), (3, 'TRABAJADOR'), (4, 'CLIENTE'), (5, 'CLIENTE');

-- Usuarios (password: "password123" para todos)
-- Hash bcrypt generado con 10 rounds para "password123"
INSERT INTO `usuario` (`id`, `persona_id`, `email`, `password_hash`, `auth_provider`, `is_active`) VALUES
(1, 1, 'usuario@keyhub.com', '$2a$10$GeirKHbbrs3B5f3pOvSovu5q2B.agfSsONKoajWjcntdMklb50Iga', 'local', 1),
(2, 2, 'agente@keyhub.com', '$2a$10$GeirKHbbrs3B5f3pOvSovu5q2B.agfSsONKoajWjcntdMklb50Iga', 'local', 1),
(3, 3, 'admin@keyhub.com', '$2a$10$GeirKHbbrs3B5f3pOvSovu5q2B.agfSsONKoajWjcntdMklb50Iga', 'local', 1),
(4, 4, 'ana.martinez@email.com', '$2a$10$GeirKHbbrs3B5f3pOvSovu5q2B.agfSsONKoajWjcntdMklb50Iga', 'local', 1),
(5, 5, 'pedro.lopez@email.com', '$2a$10$GeirKHbbrs3B5f3pOvSovu5q2B.agfSsONKoajWjcntdMklb50Iga', 'local', 1);

-- Asignación de roles
INSERT INTO `usuario_rol_app` (`usuario_id`, `rol_app_id`) VALUES (1, 1), (2, 2), (3, 3), (4, 1), (5, 1);

-- INMUEBLES EN VENTA
INSERT INTO `inmueble` VALUES
(1, 1, 'DEPT-001', 1, 'Buenos Aires', 'CABA', 'Recoleta', 'Av. Santa Fe 2500', -34.588889, -58.395556, 85.00, 75.00, 3, 2, 2, 1, 1, 2, 2019, 2, 'KeyHub Propiedades', 'Hermoso departamento de 3 ambientes en Recoleta. Living-comedor amplio, cocina integrada, 2 dormitorios, 2 baños. Edificio con amenities.', NOW(), NOW(), 180000.00, 'USD', 1, 'venta'),
(2, 2, 'CASA-001', 6, 'Buenos Aires', 'San Isidro', 'Beccar', 'Calle Los Aromos 450', -34.465278, -58.537500, 350.00, 220.00, 5, 4, 3, 2, 1, 3, 2012, 1, 'Propietario Directo', 'Casa en barrio privado. 4 dormitorios, 3 baños, jardín con piscina y quincho. Seguridad 24hs.', NOW(), NOW(), 450000.00, 'USD', 1, 'venta'),
(3, 1, 'DEPT-002', 2, 'Buenos Aires', 'Vicente López', 'Centro', 'Av. Maipú 3200', -34.527222, -58.478889, 65.00, 58.00, 2, 1, 1, 1, 1, 1, 2023, 3, 'Constructora Del Norte', 'Monoambiente a estrenar en torre. Amenities: piscina, gimnasio, sum. A metros del tren.', NOW(), NOW(), 120000.00, 'USD', 1, 'venta'),
(4, 3, 'LOCAL-001', 7, 'Buenos Aires', 'CABA', 'Palermo', 'Av. Santa Fe 4800', -34.588333, -58.421111, 120.00, 120.00, NULL, NULL, 2, NULL, 1, 4, 1998, 2, 'KeyHub Propiedades', 'Local comercial sobre avenida. Vidriera amplia, depósito, 2 baños. Ideal comercio.', NOW(), NOW(), 250000.00, 'USD', 1, 'venta');

-- INMUEBLES EN ALQUILER  
INSERT INTO `inmueble` VALUES
(5, 1, 'DEPT-ALQ-001', 1, 'Buenos Aires', 'CABA', 'Belgrano', 'Av. Cabildo 2100', -34.560278, -58.456667, 70.00, 65.00, 2, 1, 1, 0, 1, 3, 2010, 2, 'KeyHub Propiedades', 'Departamento 2 ambientes en Belgrano. Living comedor con balcón, cocina, dormitorio, baño. Luminoso.', NOW(), NOW(), 450000.00, 'ARS', 1, 'alquiler'),
(6, 2, 'CASA-ALQ-001', 3, 'Buenos Aires', 'Quilmes', 'Centro', 'Calle Rivadavia 850', -34.720556, -58.263889, 180.00, 140.00, 4, 3, 2, 1, 1, 4, 2005, 1, 'Propietario Directo', 'Casa 3 dormitorios en Quilmes centro. Patio con parrilla. Cerca de tren.', NOW(), NOW(), 380000.00, 'ARS', 1, 'alquiler'),
(7, 1, 'DEPT-ALQ-002', 4, 'Buenos Aires', 'La Plata', 'Centro', 'Calle 7 entre 47 y 48', -34.921111, -57.954444, 55.00, 50.00, 2, 1, 1, 0, 1, 3, 2008, 2, 'Inmobiliaria La Plata', 'Departamento 2 ambientes en centro La Plata. A metros de UNLP.', NOW(), NOW(), 320000.00, 'ARS', 1, 'alquiler'),
(8, 3, 'LOCAL-ALQ-001', 7, 'Buenos Aires', 'CABA', 'Caballito', 'Av. Rivadavia 5200', -34.617778, -58.434722, 80.00, 80.00, NULL, NULL, 1, NULL, 1, 3, 2013, 2, 'KeyHub Propiedades', 'Local comercial en Caballito. Ideal oficina o consultorio. Zona de alto tránsito.', NOW(), NOW(), 550000.00, 'ARS', 1, 'alquiler');

-- Departamentos
INSERT INTO `departamento` VALUES (1, 'DEPT-001-5A', '5', 'A'), (3, 'DEPT-002-12B', '12', 'B'), (5, 'DEPT-ALQ-001-3C', '3', 'C'), (7, 'DEPT-ALQ-002-4A', '4', 'A');

-- Casas
INSERT INTO `casa` VALUES (2, 'Escritorio, Lavadero, Quincho'), (6, 'Patio, Parrilla');

-- Locales
INSERT INTO `local` VALUES (4, 'Comercial General', 1), (8, 'Oficina/Consultorio', 1);

-- Amenidades de inmuebles
INSERT INTO `inmueble_amenidad` VALUES (1,2),(1,5),(1,7),(1,9),(1,10),(1,12),(2,1),(2,3),(2,4),(2,7),(2,8),(2,9),(2,12),(3,1),(3,2),(3,3),(3,5),(3,7),(3,9),(3,10),(5,5),(5,7),(5,10),(6,3),(6,4),(6,12),(7,9),(7,10),(8,9);

-- Consultas
INSERT INTO `consulta` (`inmueble_id`, `nombre`, `email`, `telefono`, `mensaje`, `tipo_consulta`, `estado`) VALUES
(1, 'Juan Pérez', 'usuario@keyhub.com', '11-2222-3333', 'Me interesa visitar este departamento', 'VISITA', 'PENDIENTE'),
(2, 'Ana Martínez', 'ana.martinez@email.com', '11-5555-6666', '¿El precio es negociable?', 'INFORMACION', 'ATENDIDA'),
(5, 'Pedro López', 'pedro.lopez@email.com', '11-6666-7777', 'Necesito alquilar urgente', 'VISITA', 'PENDIENTE');

-- Favoritos
INSERT INTO `favorito` (`usuario_id`, `inmueble_id`) VALUES (1,1),(1,3),(1,5),(4,2),(4,6),(5,5),(5,7);

-- Alquileres
INSERT INTO `alquiler` VALUES (5, 1, 2, 4, DATE_SUB(NOW(), INTERVAL 6 MONTH), DATE_ADD(NOW(), INTERVAL 18 MONTH), 450000.00, 'VIGENTE');

SET FOREIGN_KEY_CHECKS = 1;