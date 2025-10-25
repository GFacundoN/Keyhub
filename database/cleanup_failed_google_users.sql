-- Script para limpiar intentos fallidos de registro con Google
-- Esto borra personas que se crearon pero no tienen usuario asociado

-- 1. Ver qué personas huérfanas existen
SELECT p.* 
FROM persona p
LEFT JOIN usuario u ON u.persona_id = p.id
WHERE u.id IS NULL
  AND p.cod_personal LIKE 'GOOGLE-%';

-- 2. Si confirmas que quieres borrarlas, descomenta esta línea:
-- DELETE p FROM persona p
-- LEFT JOIN usuario u ON u.persona_id = p.id
-- WHERE u.id IS NULL AND p.cod_personal LIKE 'GOOGLE-%';

-- NOTA: Esto solo borra personas creadas por Google que no tienen usuario asociado
-- (o sea, intentos fallidos de registro)
