# ✅ Sistema de Perfil Completo - Instalado

## 🎯 ¿Qué se agregó?

Ahora el formulario de editar perfil incluye:

### 📸 **Foto de Perfil**
- Subir imagen (JPG, PNG, GIF)
- Máximo 2MB
- Se muestra en perfil y formulario

### 👤 **Datos Personales**
- **Nombre*** (obligatorio)
- **Apellido*** (obligatorio)
- **DNI** (opcional, 7-8 dígitos)
- **Teléfono** (opcional)

### 🔐 **Datos de Cuenta**
- **Email*** (obligatorio)
- **Contraseña** (opcional, solo si quieres cambiarla)
- **Fecha de registro** (se muestra, no se puede editar)
- **Usuario activo** (checkbox)

---

## 🚀 PASOS PARA ACTIVAR

### **1. Ejecutar el script SQL**

Abre MySQL Workbench o tu cliente MySQL y ejecuta:

```sql
USE inmobiliaria;

ALTER TABLE usuario 
ADD COLUMN foto_perfil VARCHAR(255) DEFAULT NULL COMMENT 'Ruta de la foto de perfil' AFTER email;
```

O desde terminal:
```bash
mysql -u root -p inmobiliaria < database/agregar_foto_perfil.sql
```

### **2. Reiniciar el servidor**

Detén el servidor (Ctrl+C) y vuélvelo a iniciar:

```bash
npm start
```

o

```bash
npm run dev
```

---

## 📝 CÓMO USAR

### **Editar tu perfil:**

1. Inicia sesión con cualquier usuario
2. Ve a tu perfil (click en tu email en el navbar)
3. Click en "Editar Perfil"
4. Completa todos los campos:
   - Sube una foto (opcional)
   - Nombre y Apellido (obligatorios)
   - DNI y Teléfono (opcionales)
   - Cambia contraseña si quieres (opcional)
5. Click en "Actualizar"

---

## 🗂️ ARCHIVOS MODIFICADOS

### **Vistas:**
- ✅ `views/usuarios/edit.ejs` - Formulario completo
- ✅ `views/usuarios/show.ejs` - Muestra foto de perfil

### **Backend:**
- ✅ `routes/usuarios.js` - Configuración de Multer
- ✅ `controllers/usuariosController.js` - Procesa foto y datos
- ✅ `models/Usuario.js` - Método `updateWithPersona()`

### **Base de Datos:**
- ✅ `database/agregar_foto_perfil.sql` - Script SQL

### **Carpetas:**
- ✅ `public/uploads/perfiles/` - Almacena fotos

---

## 🔍 ESTRUCTURA DE DATOS

### **Tabla: usuario**
```
- id
- username
- email
- password_hash
- foto_perfil ← NUEVO CAMPO
- activo
- fecha_creacion
- persona_id (FK)
```

### **Tabla: persona**
```
- id
- nombre
- apellido
- dni
- telefono
- email
- persona_rol_id
```

---

## ✨ CARACTERÍSTICAS

### **Foto de Perfil:**
- ✅ Se guarda en `public/uploads/perfiles/`
- ✅ Nombre único: `perfil-timestamp-random.jpg`
- ✅ Validación: Solo imágenes JPG, PNG, GIF
- ✅ Tamaño máximo: 2MB
- ✅ Se muestra circular con borde azul

### **Datos Personales:**
- ✅ Nombre y Apellido son obligatorios
- ✅ DNI: Validación de 7-8 dígitos numéricos
- ✅ Teléfono: Formato libre
- ✅ Si el usuario no tiene persona asociada, se crea automáticamente

### **Seguridad:**
- ✅ Contraseña hasheada con bcrypt
- ✅ Solo el usuario puede editar su propio perfil
- ✅ Transacciones en BD para integridad de datos

---

## 🧪 PROBAR QUE FUNCIONA

### **Test 1: Login y ver perfil**
```
1. Ir a /auth/login
2. Login: admin@keyhub.com / 123456
3. Click en "admin@keyhub.com" (navbar)
4. Deberías ver tu perfil
```

### **Test 2: Editar perfil**
```
1. En tu perfil, click "Editar Perfil"
2. Sube una foto
3. Completa Nombre: Juan
4. Completa Apellido: Pérez
5. DNI: 12345678
6. Teléfono: +54 11 1234-5678
7. Click "Actualizar"
8. Deberías ver la foto y todos los datos actualizados
```

### **Test 3: Cambiar contraseña**
```
1. Editar perfil
2. En "Nueva Contraseña" poner: nuevapass123
3. Guardar
4. Logout
5. Login con la nueva contraseña
```

---

## ❓ SOLUCIÓN DE PROBLEMAS

### **Error: "Column 'foto_perfil' doesn't exist"**
➡️ **Solución:** Ejecuta el script SQL del paso 1

### **Error al subir foto**
➡️ **Solución:** 
- Verifica que existe la carpeta `public/uploads/perfiles/`
- Verifica que el archivo sea JPG, PNG o GIF
- Verifica que pese menos de 2MB

### **Los datos no se guardan**
➡️ **Solución:**
- Verifica que completaste Nombre y Apellido (son obligatorios)
- Verifica que el servidor esté corriendo
- Mira la consola del servidor para ver errores

### **La foto no se muestra**
➡️ **Solución:**
- Verifica que la ruta sea `/uploads/perfiles/perfil-...jpg`
- Verifica que el archivo existe en `public/uploads/perfiles/`
- Refresca la página (Ctrl+F5)

---

## 📊 RESUMEN

**Antes:**
- Solo podías editar: email, contraseña, activo

**Ahora:**
- ✅ Foto de perfil
- ✅ Nombre completo
- ✅ DNI
- ✅ Teléfono
- ✅ Email
- ✅ Contraseña
- ✅ Ver fecha de registro
- ✅ Estado activo/inactivo

**Todo funciona con validación y seguridad! 🎉**
