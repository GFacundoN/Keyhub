const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

// Serializar usuario para la sesión
passport.serializeUser((user, done) => {
  // Si es un usuario pendiente (nuevo de Google), usar identificador especial
  if (user.isPending) {
    return done(null, 'pending');
  }
  done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  // Si es 'pending', es un usuario que aún no se registró completamente
  if (id === 'pending') {
    return done(null, { isPending: true });
  }
  
  try {
    const user = await Usuario.getById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configurar estrategia de Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Buscar usuario existente con este Google ID
      const existingUser = await Usuario.getByGoogleId(profile.id);
      
      if (existingUser) {
        // Usuario ya existe, iniciar sesión
        return done(null, existingUser);
      }
      
      // Buscar si existe un usuario con el mismo email
      const emailUser = await Usuario.getByEmail(profile.emails[0].value);
      
      if (emailUser) {
        // Usuario con ese email ya existe, vincular cuenta de Google
        await Usuario.linkGoogleAccount(emailUser.id, profile.id, profile.photos[0]?.value);
        const updatedUser = await Usuario.getById(emailUser.id);
        return done(null, updatedUser);
      }
      
      // Usuario nuevo - necesita completar datos adicionales
      // Guardamos los datos de Google en un objeto especial para identificarlo después
      const pendingUser = {
        isPending: true,
        googleData: {
          google_id: profile.id,
          email: profile.emails[0].value,
          foto_perfil: profile.photos[0]?.value,
          nombre: profile.name.givenName,
          apellidos: profile.name.familyName
        }
      };
      
      return done(null, pendingUser);
      
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;
