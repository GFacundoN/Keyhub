# 🚀 Guía de Despliegue - KeyHub

Esta guía cubre el despliegue de KeyHub en diferentes plataformas y entornos de producción.

## 📋 Tabla de Contenidos

- [Preparación para Producción](#preparación-para-producción)
- [Despliegue en Heroku](#despliegue-en-heroku)
- [Despliegue en Railway](#despliegue-en-railway)
- [Despliegue en VPS](#despliegue-en-vps)
- [Despliegue con Docker](#despliegue-con-docker)
- [Variables de Entorno](#variables-de-entorno)
- [Base de Datos en Producción](#base-de-datos-en-producción)
- [SSL/HTTPS](#sslhttps)
- [Monitoreo](#monitoreo)

---

## 🔧 Preparación para Producción

### 1. Checklist de Pre-Despliegue

- [ ] Tests pasan exitosamente
- [ ] Variables de entorno configuradas
- [ ] Base de datos respaldada
- [ ] Dependencias actualizadas
- [ ] Código versionado en Git
- [ ] Documentación actualizada
- [ ] SSL configurado
- [ ] Dominio configurado

### 2. Optimizaciones Necesarias

```javascript
// server.js - Agregar para producción

// Habilitar compresión
const compression = require('compression');
app.use(compression());

// Configurar headers de seguridad
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de requests
});
app.use('/api/', limiter);
```

### 3. Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3000

# Base de datos
DB_HOST=tu-db-host.com
DB_USER=tu_usuario
DB_PASSWORD=contraseña_segura
DB_NAME=inmobiliaria
DB_PORT=3306

# Sesiones
SESSION_SECRET=genera_un_secreto_muy_seguro_aquí

# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=https://tu-dominio.com/auth/google/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password

# URL base
BASE_URL=https://tu-dominio.com
```

---

## ☁️ Despliegue en Heroku

### 1. Preparación

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear app
heroku create keyhub-app
```

### 2. Configurar Base de Datos

```bash
# Agregar ClearDB MySQL
heroku addons:create cleardb:ignite

# Obtener URL de la base de datos
heroku config:get CLEARDB_DATABASE_URL
```

### 3. Configurar Variables de Entorno

```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=tu_secreto
heroku config:set GOOGLE_CLIENT_ID=tu_client_id
heroku config:set GOOGLE_CLIENT_SECRET=tu_secret
```

### 4. Crear Procfile

```
web: node server.js
```

### 5. Desplegar

```bash
git add .
git commit -m "Deploy: preparar para Heroku"
git push heroku main

# Ver logs
heroku logs --tail
```

### 6. Configurar Base de Datos

```bash
# Conectar a la base de datos
heroku config:get CLEARDB_DATABASE_URL
mysql -h host -u user -p database_name < database/full-schema.sql
```

---

## 🚂 Despliegue en Railway

### 1. Preparación

1. Crea cuenta en [Railway.app](https://railway.app)
2. Conecta tu repositorio de GitHub

### 2. Configurar Servicio

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link con proyecto
railway link

# Agregar MySQL
railway add --plugin mysql
```

### 3. Variables de Entorno

En el dashboard de Railway, agrega:

```env
NODE_ENV=production
SESSION_SECRET=tu_secreto
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_secret
```

### 4. Desplegar

```bash
# Deploy automático con cada push a main
git push origin main

# O deploy manual
railway up
```

---

## 🖥️ Despliegue en VPS (Ubuntu/Debian)

### 1. Conectar al VPS

```bash
ssh user@your-server-ip
```

### 2. Instalar Dependencias

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar MySQL
sudo apt install -y mysql-server

# Instalar Nginx
sudo apt install -y nginx

# Instalar PM2
sudo npm install -g pm2
```

### 3. Configurar MySQL

```bash
sudo mysql_secure_installation

# Crear base de datos
sudo mysql
CREATE DATABASE inmobiliaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'keyhub'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT ALL PRIVILEGES ON inmobiliaria.* TO 'keyhub'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Importar schema
mysql -u keyhub -p inmobiliaria < database/full-schema.sql
```

### 4. Clonar y Configurar Proyecto

```bash
# Clonar repositorio
cd /var/www
sudo git clone https://github.com/TU_USUARIO/KeyHub.git
cd KeyHub

# Instalar dependencias
sudo npm install --production

# Configurar .env
sudo nano .env
```

### 5. Configurar PM2

```bash
# Iniciar aplicación
pm2 start server.js --name keyhub

# Guardar configuración
pm2 save

# Auto-inicio en reboot
pm2 startup systemd
```

### 6. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/keyhub
```

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /var/www/KeyHub/public;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/keyhub /etc/nginx/sites-enabled/

# Test configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 7. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Auto-renovación
sudo certbot renew --dry-run
```

---

## 🐳 Despliegue con Docker

### 1. Crear Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production

# Iniciar aplicación
CMD ["node", "server.js"]
```

### 2. Crear docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_USER=keyhub
      - DB_PASSWORD=password
      - DB_NAME=inmobiliaria
      - SESSION_SECRET=your_secret
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=inmobiliaria
      - MYSQL_USER=keyhub
      - MYSQL_PASSWORD=password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/full-schema.sql:/docker-entrypoint-initdb.d/schema.sql
    restart: unless-stopped

volumes:
  mysql_data:
```

### 3. Desplegar

```bash
# Construir y levantar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## 🔐 SSL/HTTPS

### Let's Encrypt (Gratis)

```bash
# Con Certbot
sudo certbot --nginx -d tu-dominio.com

# Renovación automática
sudo crontab -e
0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Gratis)

1. Agrega tu dominio a Cloudflare
2. Configura DNS records
3. Habilita SSL/TLS (Full)
4. Habilita "Always Use HTTPS"

---

## 📊 Monitoreo

### PM2 Monitoring

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs keyhub

# Ver métricas
pm2 monit
```

### Configurar Alertas

```bash
# Instalar PM2 Plus
pm2 install pm2-server-monit
```

---

## 🔄 Actualización en Producción

```bash
# En el servidor
cd /var/www/KeyHub

# Backup de base de datos
mysqldump -u keyhub -p inmobiliaria > backup-$(date +%F).sql

# Pull cambios
sudo git pull origin main

# Instalar nuevas dependencias
sudo npm install --production

# Restart aplicación
pm2 restart keyhub
```

---

## 🆘 Troubleshooting

### Logs

```bash
# PM2 logs
pm2 logs keyhub

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### Problemas Comunes

**Puerto en uso:**
```bash
sudo lsof -i :3000
sudo kill -9 PID
```

**Permisos:**
```bash
sudo chown -R $USER:$USER /var/www/KeyHub
```

**MySQL connection:**
```bash
sudo service mysql status
sudo service mysql restart
```

---

## 📞 Soporte

Si encuentras problemas durante el despliegue:

1. Revisa los logs
2. Verifica las variables de entorno
3. Consulta la documentación oficial
4. Abre un [Issue](https://github.com/TU_USUARIO/KeyHub/issues)

---

<div align="center">

**Guía actualizada: Noviembre 2024**

</div>
