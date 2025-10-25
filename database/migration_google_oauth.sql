-- Migración para agregar soporte de Google OAuth
-- Ejecutar este script en tu base de datos MySQL

-- IMPORTANTE: Si alguna columna ya existe, comenta esa línea específica

-- 1. Agregar columna google_id
ALTER TABLE usuario 
ADD COLUMN google_id VARCHAR(255) UNIQUE AFTER email;

-- 2. La columna foto_perfil ya existe en la base de datos, no es necesario crearla
-- Si por alguna razón no existe, descomenta esta línea:
-- ALTER TABLE usuario 
-- ADD COLUMN foto_perfil VARCHAR(500) AFTER google_id;

-- 3. Agregar columna auth_provider
ALTER TABLE usuario 
ADD COLUMN auth_provider ENUM('local', 'google') DEFAULT 'local' AFTER foto_perfil;

-- 4. Hacer password_hash opcional (puede ser NULL para usuarios de Google)
ALTER TABLE usuario 
MODIFY COLUMN password_hash VARCHAR(255) NULL;

-- NOTAS IMPORTANTES:
-- Si alguna de estas columnas ya existe, recibirás un error "Duplicate column name"
-- En ese caso, simplemente comenta o elimina esa línea específica del script

-- Si tu tabla usa 'password' en lugar de 'password_hash', ejecuta esto en su lugar:
-- ALTER TABLE usuario CHANGE COLUMN password password_hash VARCHAR(255) NULL;

-- Si tu tabla usa 'activo' en lugar de 'is_active', ejecuta esto también:
-- ALTER TABLE usuario CHANGE COLUMN activo is_active BOOLEAN DEFAULT TRUE;
