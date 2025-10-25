-- Script para borrar usuario con ID 10
-- ADVERTENCIA: Esta acción es irreversible

-- 1. Verificar información del usuario antes de borrar
SELECT 
    u.id,
    u.email,
    u.username,
    p.nombre,
    p.apellidos,
    u.auth_provider,
    u.created_at
FROM usuario u 
LEFT JOIN persona p ON u.persona_id = p.id 
WHERE u.id = 10;

-- 2. Si confirmas que quieres borrarlo, descomenta y ejecuta estas líneas:

-- -- Borrar relaciones con roles
-- DELETE FROM usuario_rol_app WHERE usuario_id = 10;

-- -- Borrar el usuario
-- DELETE FROM usuario WHERE id = 10;

-- NOTA: Si el usuario tiene una persona asociada y quieres borrarla también:
-- DELETE FROM persona WHERE id = (SELECT persona_id FROM usuario WHERE id = 10);
