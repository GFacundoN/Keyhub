-- Script para corregir el problema de las columnas de foto de perfil
-- Hay dos columnas: foto_perfil (original) y profile_picture (de la migración)

-- PASO 1: Ver qué columnas existen en la tabla usuario
SHOW COLUMNS FROM usuario LIKE '%perfil%';
SHOW COLUMNS FROM usuario LIKE '%picture%';

-- PASO 2: Ver si hay datos en profile_picture
SELECT id, email, foto_perfil, profile_picture 
FROM usuario 
WHERE profile_picture IS NOT NULL OR foto_perfil IS NOT NULL;

-- PASO 3: Copiar datos de profile_picture a foto_perfil (si existen)
-- Descomenta estas líneas después de verificar:
-- UPDATE usuario 
-- SET foto_perfil = profile_picture 
-- WHERE profile_picture IS NOT NULL AND foto_perfil IS NULL;

-- PASO 4: Eliminar la columna profile_picture (ya no la necesitamos)
-- Descomenta esta línea después de copiar los datos:
-- ALTER TABLE usuario DROP COLUMN profile_picture;

-- PASO 5: Verificar que todo quedó bien
-- SELECT id, email, foto_perfil FROM usuario WHERE foto_perfil IS NOT NULL;
