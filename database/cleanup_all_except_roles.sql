-- Script para borrar todos los usuarios y personas EXCEPTO los que tienen roles
-- (admin, agente, usuario)
-- ADVERTENCIA: Esta acción es irreversible

-- ========================================
-- PASO 1: Ver qué usuarios se van a borrar
-- ========================================

-- Ver usuarios SIN roles asignados (estos se borrarán)
SELECT u.id, u.email, u.auth_provider, u.created_at, 'Sin rol' as motivo
FROM usuario u
LEFT JOIN usuario_rol_app ur ON u.id = ur.usuario_id
WHERE ur.id IS NULL;

-- ========================================
-- PASO 2: BORRAR (descomenta estas líneas cuando estés seguro)
-- ========================================

-- 2A. Borrar usuarios que NO tienen roles asignados
-- DELETE u FROM usuario u
-- LEFT JOIN usuario_rol_app ur ON u.id = ur.usuario_id
-- WHERE ur.id IS NULL;

-- 2B. Borrar personas huérfanas (sin usuario asociado)
-- DELETE p FROM persona p
-- LEFT JOIN usuario u ON u.persona_id = p.id
-- WHERE u.id IS NULL;

-- ========================================
-- RESUMEN DE LO QUE HACE EL SCRIPT:
-- ========================================
-- 1. Borra usuarios que NO tienen rol asignado
-- 2. Borra personas que quedaron sin usuario asociado
-- 3. MANTIENE todos los usuarios con roles (admin, agente, usuario)

-- ========================================
-- VERIFICACIÓN DESPUÉS DE BORRAR
-- ========================================
-- Ejecuta esto después para verificar:
-- SELECT u.id, u.email, r.nombre as rol
-- FROM usuario u
-- LEFT JOIN usuario_rol_app ur ON u.id = ur.usuario_id
-- LEFT JOIN rol_app r ON ur.rol_app_id = r.id;
