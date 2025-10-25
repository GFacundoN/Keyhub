# Configuración de Google OAuth para KeyHub

Esta guía te ayudará a configurar el inicio de sesión con Google en tu aplicación KeyHub.

## 📋 Prerequisitos

1. Una cuenta de Google
2. Acceso a [Google Cloud Console](https://console.cloud.google.com)

## 🚀 Paso 1: Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Haz clic en el selector de proyectos en la parte superior
3. Haz clic en **"Nuevo Proyecto"**
4. Nombra tu proyecto (ejemplo: "KeyHub")
5. Haz clic en **"Crear"**

## 🔐 Paso 2: Configurar la Pantalla de Consentimiento OAuth

1. En el menú lateral, ve a **"APIs y servicios"** → **"Pantalla de consentimiento de OAuth"**
2. Selecciona **"Externo"** como tipo de usuario
3. Haz clic en **"Crear"**
4. Completa la información requerida:
   - **Nombre de la aplicación**: KeyHub
   - **Correo electrónico de asistencia**: tu email
   - **Logotipo de la aplicación** (opcional)
   - **Dominios autorizados**: (déjalo vacío para desarrollo local)
   - **Correo del desarrollador**: tu email
5. Haz clic en **"Guardar y continuar"**
6. En **"Ámbitos"**, haz clic en **"Agregar o quitar ámbitos"**
7. Selecciona los siguientes ámbitos:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
8. Haz clic en **"Actualizar"** y luego **"Guardar y continuar"**
9. En **"Usuarios de prueba"**, agrega tu email de Google (para desarrollo)
10. Haz clic en **"Guardar y continuar"** y luego **"Volver al panel"**

## 🔑 Paso 3: Crear Credenciales OAuth

1. En el menú lateral, ve a **"APIs y servicios"** → **"Credenciales"**
2. Haz clic en **"+ Crear credenciales"** → **"ID de cliente de OAuth"**
3. Selecciona **"Aplicación web"** como tipo de aplicación
4. Configura:
   - **Nombre**: KeyHub Web Client
   - **Orígenes de JavaScript autorizados**: 
     - `http://localhost:3000`
   - **URIs de redireccionamiento autorizados**:
     - `http://localhost:3000/auth/google/callback`
5. Haz clic en **"Crear"**
6. **¡IMPORTANTE!** Copia el **Client ID** y el **Client Secret** que aparecen

## ⚙️ Paso 4: Configurar Variables de Entorno

1. Abre tu archivo `.env` en el proyecto KeyHub
2. Agrega las siguientes variables con los datos que copiaste:

```env
# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## 🗄️ Paso 5: Ejecutar Migración de Base de Datos

Ejecuta el siguiente script SQL en tu base de datos MySQL para agregar soporte de Google OAuth:

```bash
mysql -u root -p keyhub < database/migration_google_oauth.sql
```

O ejecuta manualmente el contenido del archivo `database/migration_google_oauth.sql` en tu cliente MySQL.

## ✅ Paso 6: Probar la Integración

1. Reinicia tu servidor Node.js:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/auth/login`

3. Haz clic en el botón **"Iniciar sesión con Google"**

4. Selecciona tu cuenta de Google

5. Acepta los permisos solicitados

6. Deberías ser redirigido a la página principal como usuario autenticado

## 🎯 Características Implementadas

- ✅ Inicio de sesión con Google OAuth 2.0
- ✅ Formulario de completar perfil para usuarios nuevos
- ✅ Solicita DNI y teléfono (datos no disponibles en Google)
- ✅ Los usuarios de Google se crean con rol "usuario" por defecto
- ✅ Vinculación de cuentas (si un email ya existe, se vincula con Google)
- ✅ Foto de perfil de Google guardada automáticamente
- ✅ Nombre y apellido extraídos del perfil de Google

## 📝 Flujo de Registro con Google

1. **Usuario hace clic en "Iniciar sesión con Google"**
2. **Redirige a Google** para autenticación
3. **Si el usuario ya existe:**
   - Inicia sesión directamente
   - Si tiene cuenta local, vincula con Google
4. **Si el usuario es nuevo:**
   - Redirige a formulario de completar perfil
   - Solicita DNI (obligatorio) y teléfono (opcional)
   - Muestra datos ya obtenidos de Google (email, nombre, foto)
5. **Al completar el formulario:**
   - Crea el usuario en la base de datos
   - Asigna rol de "usuario" automáticamente
   - Inicia sesión automáticamente

## 🔒 Seguridad

- Las contraseñas NO son necesarias para usuarios que se registran con Google
- Los usuarios de Google tienen `auth_provider = 'google'` en la base de datos
- El `google_id` se usa como identificador único para usuarios de Google
- Los datos sensibles de Google se guardan temporalmente en sesión hasta completar el registro

## 🚀 Producción

Para usar en producción, deberás:

1. Actualizar los **Orígenes de JavaScript autorizados** en Google Cloud Console con tu dominio:
   - `https://tudominio.com`

2. Actualizar las **URIs de redireccionamiento autorizados**:
   - `https://tudominio.com/auth/google/callback`

3. Actualizar la variable `GOOGLE_CALLBACK_URL` en tu `.env`:
   ```env
   GOOGLE_CALLBACK_URL=https://tudominio.com/auth/google/callback
   ```

4. Publicar tu aplicación OAuth en Google Cloud Console (quitar modo prueba)

## 🆘 Solución de Problemas

### Error: "redirect_uri_mismatch"
- Verifica que la URL de callback en Google Cloud Console coincida exactamente con `GOOGLE_CALLBACK_URL`

### Error: "Access blocked: This app's request is invalid"
- Asegúrate de haber configurado la pantalla de consentimiento OAuth
- Verifica que tu email esté en la lista de usuarios de prueba

### Error: "Error al vincular cuenta"
- Ejecuta la migración SQL para agregar las columnas necesarias en la tabla usuario

### Los usuarios no obtienen rol
- Verifica que exista el rol "usuario" en la tabla `rol_app`
- Ejecuta: `INSERT INTO rol_app (nombre, descripcion) VALUES ('usuario', 'Usuario estándar');`

## 📝 Notas Adicionales

- Los usuarios registrados con Google NO pueden iniciar sesión con el formulario tradicional (no tienen contraseña)
- Si un usuario se registra tradicionalmente y luego usa Google con el mismo email, las cuentas se vincularán automáticamente
- Los administradores y agentes solo pueden ser creados manualmente desde la base de datos (por seguridad)
