require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('./config/passport');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const indexRoutes = require('./routes/index');
const inmueblesRoutes = require('./routes/inmuebles');
const usuariosRoutes = require('./routes/usuarios');
const personasRoutes = require('./routes/personas');
const consultasRoutes = require('./routes/consultas');
const authRoutes = require('./routes/auth');
const favoritosRoutes = require('./routes/favoritos');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parser de body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'tu-secreto-super-secreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para pasar datos de sesión a todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.user;
  next();
});

// Rutas
app.use('/', indexRoutes);
app.use('/inmuebles', inmueblesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/personas', personasRoutes);
app.use('/consultas', consultasRoutes);
app.use('/auth', authRoutes);
app.use('/favoritos', favoritosRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    message: 'La página que buscas no existe',
    error: { status: 404 }
  });
});

// Manejo de errores general
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    title: 'Error',
    message: err.message || 'Ha ocurrido un error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
