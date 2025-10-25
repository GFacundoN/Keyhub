-- Script para verificar datos de usuario de Google

-- Ver todos los datos del usuario con ID 11 (el que estás usando)
SELECT 
    u.id,
    u.email,
    u.google_id,
    u.foto_perfil,
    u.auth_provider,
    u.is_active,
    u.persona_id,
    p.nombre,
    p.apellidos,
    p.dni
FROM usuario u
LEFT JOIN persona p ON u.persona_id = p.id
WHERE u.id = 11;

-- Ver todos los usuarios con foto de Google
SELECT 
    u.id,
    u.email,
    u.foto_perfil,
    p.nombre
FROM usuario u
LEFT JOIN persona p ON u.persona_id = p.id
WHERE u.foto_perfil IS NOT NULL;
