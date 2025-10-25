-- Agregar campos necesarios a la tabla inmueble
USE inmobiliaria;

-- 1. Agregar columna tipo_operacion (venta o alquiler)
ALTER TABLE inmueble 
ADD COLUMN tipo_operacion ENUM('venta', 'alquiler') NOT NULL DEFAULT 'venta'
COMMENT 'Tipo de operación: venta o alquiler'
AFTER disponible;

-- 2. Agregar columna precio
ALTER TABLE inmueble 
ADD COLUMN precio DECIMAL(12,2) DEFAULT NULL
COMMENT 'Precio del inmueble'
AFTER tipo_operacion;

-- 3. Agregar columna moneda
ALTER TABLE inmueble 
ADD COLUMN moneda ENUM('ARS', 'USD') DEFAULT 'ARS'
COMMENT 'Moneda del precio'
AFTER precio;

-- Actualizar inmuebles existentes (puedes ajustar según tu necesidad)
-- Por defecto, poner todos como venta
UPDATE inmueble 
SET tipo_operacion = 'venta'
WHERE tipo_operacion IS NULL;

-- Verificar
SELECT id, direccion, tipo_operacion, precio, moneda, disponible 
FROM inmueble 
LIMIT 10;
