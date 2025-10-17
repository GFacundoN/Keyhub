# 🔑 KeyHub - Sistema de Gestión de Inmuebles

Sistema web completo para la gestión de inmuebles (alquileres y ventas) desarrollado con Node.js, Express, EJS y MySQL.

## 📋 Características

- ✅ Gestión completa de inmuebles (CRUD)
- ✅ Sistema de autenticación de usuarios
- ✅ Búsqueda y filtrado de propiedades
- ✅ Gestión de alquileres y ventas
- ✅ Sistema de roles y permisos
- ✅ Interfaz responsive con Bootstrap 5
- ✅ Base de datos MySQL con relaciones complejas

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Base de datos:** MySQL
- **Estilos:** Bootstrap 5 + CSS personalizado
- **Iconos:** Bootstrap Icons

## 📦 Dependencias Principales

```json
{
  "express": "^4.18.2",
  "ejs": "^3.1.9",
  "mysql2": "^3.6.5",
  "dotenv": "^16.3.1",
  "express-session": "^1.17.3",
  "bcryptjs": "^2.4.3",
  "express-validator": "^7.0.1",
  "method-override": "^3.0.0",
  "multer": "^1.4.5-lts.1",
  "morgan": "^1.10.0"
}
```

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd KeyHub
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

#### Opción A: Usando MySQL Workbench

1. Abrir MySQL Workbench
2. Conectarse a tu servidor MySQL
3. Abrir el archivo `database/schema.sql`
4. Ejecutar el script completo (esto creará la base de datos y todas las tablas)

#### Opción B: Usando línea de comandos

```bash
mysql -u root -p < database/schema.sql
```

### 4. Configurar variables de entorno

Copiar el archivo `.env.example` a `.env`:

```bash
copy .env.example .env
```

Editar el archivo `.env` con tus credenciales:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de la base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=keyhub
DB_PORT=3306

# Configuración de sesiones
SESSION_SECRET=tu_secreto_super_seguro_aqui
```

### 5. Iniciar el servidor

#### Modo desarrollo (con nodemon):
```bash
npm run dev
```

#### Modo producción:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
KeyHub/
├── config/
│   └── database.js          # Configuración de conexión a MySQL
├── controllers/
│   ├── authController.js    # Controlador de autenticación
│   ├── inmueblesController.js
│   └── usuariosController.js
├── database/
│   └── schema.sql           # Script SQL para crear la BD
├── middlewares/
│   └── auth.js              # Middlewares de autenticación
├── models/
│   ├── Alquiler.js
│   ├── Compra.js
│   ├── Inmueble.js
│   ├── Persona.js
│   └── Usuario.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── routes/
│   ├── auth.js
│   ├── index.js
│   ├── inmuebles.js
│   └── usuarios.js
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── inmuebles/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── create.ejs
│   │   ├── edit.ejs
│   │   ├── alquileres.ejs
│   │   └── ventas.ejs
│   ├── usuarios/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── error.ejs
├── .env.example
├── .gitignore
├── package.json
├── server.js                # Punto de entrada de la aplicación
└── README.md
```

## 🗄️ Modelo de Base de Datos

El sistema utiliza un modelo de base de datos completo con las siguientes tablas principales:

- **inmueble**: Tabla principal de propiedades
- **inmueble_tipo**: Tipos de inmuebles (Casa, Departamento, Local, Garaje)
- **zona**: Zonas geográficas
- **persona**: Datos de personas (propietarios, inquilinos, compradores)
- **usuario**: Usuarios del sistema
- **alquiler**: Contratos de alquiler
- **compra**: Operaciones de compra/venta
- **amenidad**: Amenidades disponibles
- **visita**: Registro de visitas a propiedades

Y tablas especializadas:
- **departamento**, **casa**, **local**, **garaje**: Detalles específicos por tipo

## 🔐 Sistema de Autenticación

El sistema incluye:
- Registro de usuarios
- Login/Logout
- Sesiones persistentes
- Encriptación de contraseñas con bcrypt
- Sistema de roles (admin, agente, usuario)

## 🎨 Características de la Interfaz

- Diseño responsive (mobile-first)
- Tema moderno con Bootstrap 5
- Iconos de Bootstrap Icons
- Animaciones y transiciones suaves
- Formularios validados
- Mensajes de error y éxito

## 📝 Rutas Principales

### Públicas
- `GET /` - Página de inicio
- `GET /inmuebles` - Listado de inmuebles
- `GET /inmuebles/:id` - Detalle de inmueble
- `GET /inmuebles/alquileres` - Inmuebles en alquiler
- `GET /inmuebles/ventas` - Inmuebles en venta
- `GET /about` - Acerca de
- `GET /contact` - Contacto

### Autenticación
- `GET /auth/login` - Formulario de login
- `POST /auth/login` - Procesar login
- `GET /auth/register` - Formulario de registro
- `POST /auth/register` - Procesar registro
- `GET /auth/logout` - Cerrar sesión

### Protegidas (requieren autenticación)
- `GET /inmuebles/create` - Crear inmueble
- `POST /inmuebles` - Guardar inmueble
- `GET /inmuebles/:id/edit` - Editar inmueble
- `PUT /inmuebles/:id` - Actualizar inmueble
- `DELETE /inmuebles/:id` - Eliminar inmueble
- `GET /usuarios` - Listado de usuarios (admin)
- `GET /usuarios/:id` - Perfil de usuario

## 🧪 Datos de Prueba

Después de ejecutar el script SQL, la base de datos incluirá:
- 4 tipos de inmuebles
- 5 zonas
- 5 categorías de antigüedad
- 4 disposiciones
- 8 amenidades
- 3 roles de aplicación

## 🔧 Configuración Adicional

### Cambiar el puerto del servidor

Editar en `.env`:
```env
PORT=3000
```

### Configurar MySQL

Asegúrate de que MySQL esté corriendo en tu sistema:
```bash
# Windows
net start MySQL80

# Verificar estado
mysql -u root -p -e "SELECT VERSION();"
```

## 📚 Uso del Sistema

### 1. Registrar un usuario
1. Ir a `/auth/register`
2. Completar el formulario
3. Iniciar sesión

### 2. Crear un inmueble
1. Iniciar sesión
2. Ir a "Inmuebles" → "Nuevo Inmueble"
3. Completar los datos
4. Guardar

### 3. Buscar inmuebles
1. Usar el buscador en la página principal
2. Aplicar filtros (tipo, zona, precio)
3. Ver detalles de cada propiedad

## 🐛 Solución de Problemas

### Error de conexión a MySQL
```
Error: ER_ACCESS_DENIED_ERROR
```
**Solución:** Verificar credenciales en `.env`

### Puerto en uso
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solución:** Cambiar el puerto en `.env` o cerrar la aplicación que usa el puerto 3000

### Módulos no encontrados
```
Error: Cannot find module 'express'
```
**Solución:** Ejecutar `npm install`

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de:
- Reportar bugs
- Sugerir mejoras
- Hacer fork del proyecto
- Enviar pull requests

## 📄 Licencia

ISC

## 👨‍💻 Autor

Proyecto desarrollado para la materia Web Dinámicas

## 📞 Soporte

Para consultas o problemas:
- Email: info@keyhub.com
- Teléfono: +54 11 1234-5678

---

**¡Gracias por usar KeyHub! 🔑🏠**
