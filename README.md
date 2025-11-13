# 🏠 KeyHub - Sistema de Gestión Inmobiliaria

<div align="center">

![KeyHub Logo](https://img.shields.io/badge/KeyHub-Inmobiliaria-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-v4.18-lightgrey?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-v8.0-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Sistema web profesional para la gestión integral de propiedades inmobiliarias**

[🇬🇧 English Version](./README_EN.md) | [📖 Documentación](#documentación) | [🚀 Demo](#demo) | [📝 Licencia](#licencia)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API y Rutas](#-api-y-rutas)
- [Base de Datos](#-base-de-datos)
- [Características de Seguridad](#-características-de-seguridad)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## ✨ Características

### 🏘️ Gestión de Inmuebles
- ✅ Catálogo completo de propiedades (venta/alquiler)
- ✅ Filtros avanzados de búsqueda
- ✅ Información detallada de cada propiedad
- ✅ Geolocalización con mapas interactivos
- ✅ Múltiples tipos de inmuebles (casas, departamentos, garajes, etc.)

### 👤 Sistema de Usuarios
- ✅ Registro e inicio de sesión tradicional
- ✅ Autenticación con Google OAuth 2.0
- ✅ Gestión de perfiles de usuario
- ✅ Sistema de roles (Admin, Agente, Usuario)
- ✅ Perfil personalizado con foto

### ❤️ Favoritos y Consultas
- ✅ Guardar propiedades favoritas
- ✅ Sistema de consultas sobre inmuebles
- ✅ Seguimiento del estado de consultas
- ✅ Notificaciones por email
- ✅ Historial completo en el perfil

### 🔐 Seguridad
- ✅ Autenticación segura con bcrypt
- ✅ Sesiones persistentes en memoria
- ✅ Protección CSRF
- ✅ Validación de datos en servidor
- ✅ Sanitización XSS

### 🎨 Interfaz Moderna
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ UI/UX intuitiva con Tailwind CSS y Bootstrap
- ✅ Animaciones y transiciones suaves
- ✅ Componentes interactivos con Alpine.js
- ✅ Iconos de Bootstrap Icons

---

## 🛠️ Tecnologías

### Backend
- **Node.js** v18+ - Entorno de ejecución
- **Express.js** v4.18 - Framework web
- **MySQL2** - Base de datos relacional
- **Passport.js** - Autenticación (Local + Google OAuth)
- **bcryptjs** - Hash de contraseñas
- **express-session** - Gestión de sesiones
- **EJS** - Motor de plantillas

### Frontend
- **Bootstrap 5.3** - Framework CSS
- **Tailwind CSS** - Utility-first CSS
- **Alpine.js** - Framework JS ligero
- **Bootstrap Icons** - Iconografía

### Herramientas de Desarrollo
- **Nodemon** - Auto-reload en desarrollo
- **dotenv** - Variables de entorno
- **Method-Override** - Soporte para PUT/DELETE

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18.0.0 o superior
- **npm** v9.0.0 o superior
- **MySQL** v8.0 o superior
- **Git** (para clonar el repositorio)

### Verificar instalaciones:

```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/KeyHub.git
cd KeyHub
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Base de Datos

#### Crear la base de datos:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE inmobiliaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE inmobiliaria;
SOURCE database/full-schema.sql;
```

O usando un solo comando:

```bash
mysql -u root -p inmobiliaria < database/full-schema.sql
```

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3000

# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=inmobiliaria
DB_PORT=3306

# Sesiones
SESSION_SECRET=tu_secreto_super_seguro_aqui

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Entorno
NODE_ENV=development
```

### 5. Iniciar el Servidor

#### Modo Desarrollo (con auto-reload):

```bash
npm run dev
```

#### Modo Producción:

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## ⚙️ Configuración

### Configurar Google OAuth (Opcional)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita "Google+ API"
4. Crea credenciales OAuth 2.0
5. Agrega las URIs autorizadas:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/google/callback`
6. Copia el Client ID y Client Secret al archivo `.env`

### Configurar Email (Para notificaciones)

Edita `config/email.js` con tu configuración SMTP:

```javascript
{
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tu_email@gmail.com',
    pass: 'tu_app_password'
  }
}
```

---

## 💻 Uso

### Crear un Usuario Administrador

```bash
node scripts/create-admin.js
```

O manualmente en MySQL:

```sql
INSERT INTO usuario (email, password_hash, is_active) 
VALUES ('admin@keyhub.com', '$2a$10$...', 1);

INSERT INTO usuario_rol (usuario_id, rol_id) 
VALUES (1, (SELECT id FROM rol WHERE nombre = 'admin'));
```

### Acceder al Sistema

1. Abre tu navegador en `http://localhost:3000`
2. Haz clic en "Iniciar Sesión"
3. Usa tus credenciales o "Iniciar sesión con Google"

### Rutas Principales

- `/` - Página de inicio
- `/inmuebles` - Catálogo de propiedades
- `/inmuebles/:id` - Detalle de propiedad
- `/auth/login` - Iniciar sesión
- `/auth/register` - Registrarse
- `/usuarios/:id` - Perfil de usuario
- `/usuarios/mis-consultas` - Mis consultas

---

## 📁 Estructura del Proyecto

```
KeyHub/
├── config/              # Configuraciones
│   ├── database.js      # Conexión a MySQL
│   └── passport.js      # Estrategias de autenticación
├── controllers/         # Lógica de negocio
│   ├── authController.js
│   ├── inmuebles Controller.js
│   ├── usuariosController.js
│   └── consultasController.js
├── database/            # Scripts SQL
│   └── full-schema.sql  # Esquema completo de BD
├── middlewares/         # Middlewares personalizados
│   ├── auth.js          # Autenticación y autorización
│   └── validators.js    # Validación de datos
├── models/              # Modelos de datos
│   ├── Usuario.js
│   ├── Inmueble.js
│   ├── Consulta.js
│   └── Favorito.js
├── public/              # Archivos estáticos
│   ├── css/
│   ├── js/
│   └── uploads/
├── routes/              # Definición de rutas
│   ├── index.js
│   ├── auth.js
│   ├── inmuebles.js
│   ├── usuarios.js
│   └── consultas.js
├── views/               # Vistas EJS
│   ├── partials/        # Componentes reutilizables
│   ├── auth/            # Login, registro
│   ├── inmuebles/       # Listado, detalle
│   └── usuarios/        # Perfil, favoritos, consultas
├── .env                 # Variables de entorno (no incluido en Git)
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias del proyecto
├── server.js           # Punto de entrada
└── README.md           # Este archivo
```

---

## 🔌 API y Rutas

### Rutas Públicas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página de inicio |
| GET | `/inmuebles` | Listado de inmuebles |
| GET | `/inmuebles/:id` | Detalle de inmueble |
| GET | `/auth/login` | Formulario de login |
| POST | `/auth/login` | Procesar login |
| GET | `/auth/register` | Formulario de registro |
| POST | `/auth/register` | Procesar registro |

### Rutas Protegidas (Requieren autenticación)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios/:id` | Ver perfil de usuario |
| GET | `/usuarios/:id/edit` | Editar perfil |
| PUT | `/usuarios/:id` | Actualizar perfil |
| GET | `/usuarios/mis-consultas` | Ver mis consultas |
| POST | `/favoritos/toggle` | Agregar/quitar favorito |
| POST | `/consultas` | Crear consulta |
| POST | `/auth/logout` | Cerrar sesión |

### Rutas Admin

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios` | Listar todos los usuarios |
| GET | `/consultas` | Ver todas las consultas |
| PUT | `/consultas/:id/estado` | Actualizar estado de consulta |

---

## 🗄️ Base de Datos

### Modelo Entidad-Relación

El sistema utiliza MySQL con las siguientes tablas principales:

- **usuario** - Información de usuarios
- **persona** - Datos personales
- **rol** - Roles del sistema
- **usuario_rol** - Relación usuario-rol
- **inmueble** - Propiedades inmobiliarias
- **inmueble_tipo** - Tipos de inmueble
- **consulta** - Consultas de usuarios
- **favorito** - Favoritos de usuarios
- **zona** - Zonas geográficas
- **alquiler** - Contratos de alquiler
- **compra** - Operaciones de compra

### Diagrama ER Simplificado

```
usuario ──┬─── persona
          ├─── usuario_rol ─── rol
          ├─── consulta ─── inmueble
          └─── favorito ─── inmueble
                            │
                            ├─── inmueble_tipo
                            ├─── zona
                            └─── alquiler/compra
```

---

## 🔒 Características de Seguridad

- **Contraseñas Hasheadas**: bcrypt con salt rounds de 10
- **Sesiones Seguras**: HttpOnly cookies, SameSite strict
- **Validación de Entrada**: Sanitización en servidor
- **Protección XSS**: Escape de datos en vistas
- **SQL Injection**: Consultas parametrizadas
- **CSRF Protection**: Tokens en formularios
- **Rate Limiting**: Limitación de intentos de login

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- Usa nombres descriptivos para variables y funciones
- Comenta código complejo
- Sigue las convenciones de ES6+
- Usa async/await en lugar de callbacks
- Mantén funciones pequeñas y enfocadas

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

Copyright © 2024 Facundo Nicolas Gandolfo

---

## 👨‍💻 Autor

**Facundo Nicolas Gandolfo**

- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- Email: facundo.gandolfo@example.com

---

## 🙏 Agradecimientos

- [Express.js](https://expressjs.com/) - Framework web
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [Alpine.js](https://alpinejs.dev/) - Framework JS
- [Passport.js](http://www.passportjs.org/) - Autenticación
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Iconos

---

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:

1. Revisa la [documentación](#-tabla-de-contenidos)
2. Busca en [Issues](https://github.com/TU_USUARIO/KeyHub/issues)
3. Crea un nuevo [Issue](https://github.com/TU_USUARIO/KeyHub/issues/new)

---

<div align="center">

**Hecho con ❤️ y ☕ por Facundo Nicolas Gandolfo**

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

</div>
