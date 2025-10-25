-- Script para arreglar el campo 'disponible' en inmuebles
USE inmobiliaria;

-- Opción 1: Si la columna NO existe, ejecuta esto (descomenta si es necesario):
-- ALTER TABLE inmueble 
-- ADD COLUMN disponible BOOLEAN DEFAULT TRUE 
-- COMMENT 'Indica si el inmueble está disponible';

-- Opción 2: Si la columna YA existe, solo actualiza los valores:
UPDATE inmueble 
SET disponible = TRUE 
WHERE disponible IS NULL OR disponible = 0;

-- Verificar el resultado
SELECT id, direccion, disponible 
FROM inmueble 
LIMIT 10;
