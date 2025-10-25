-- Agregar campo foto_perfil a la tabla usuario
USE inmobiliaria;

ALTER TABLE usuario 
ADD COLUMN foto_perfil VARCHAR(255) DEFAULT NULL COMMENT 'Ruta de la foto de perfil' AFTER email;
