const nodemailer = require('nodemailer');

// Configuración del transporter de email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER || 'example@gmail.com', // Tu email aquí
      pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Tu contraseña de aplicación aquí
    }
  });
};

module.exports = {
  createTransporter
};
