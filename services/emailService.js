const { createTransporter } = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = createTransporter();
    this.fromEmail = process.env.EMAIL_FROM || 'KeyHub <example@gmail.com>'; // Email de origen aquí
    this.recipientEmail = process.env.EMAIL_RECIPIENT || 'recipient@example.com'; // Email de destino aquí
  }

  // Plantilla HTML para email de consulta de información
  getInfoEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
          .info-row { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4F46E5; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 Nueva Consulta de Información</h1>
          </div>
          <div class="content">
            <p>Has recibido una nueva consulta de información sobre un inmueble:</p>
            
            <div class="info-row">
              <span class="label">Nombre:</span> ${data.nombre}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="info-row">
              <span class="label">Teléfono:</span> ${data.telefono}
            </div>
            <div class="info-row">
              <span class="label">Tipo de Consulta:</span> ${data.tipo_consulta}
            </div>
            ${data.inmueble ? `
            <div class="info-row">
              <span class="label">Inmueble:</span> ${data.inmueble.tipo_nombre || 'N/A'} - ${data.inmueble.direccion || 'N/A'}
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Mensaje:</span>
              <p>${data.mensaje}</p>
            </div>
            <div class="info-row">
              <span class="label">Fecha:</span> ${new Date().toLocaleDateString('es-AR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div class="footer">
            <p>Este email fue generado automáticamente desde KeyHub</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Plantilla HTML para email de agenda de visita
  getVisitEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
          .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
          .content { background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
          .info-row { margin-bottom: 15px; }
          .label { font-weight: bold; color: #10B981; }
          .highlight { background-color: #D1FAE5; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Nueva Solicitud de Visita</h1>
          </div>
          <div class="content">
            <p>Has recibido una nueva solicitud para agendar una visita:</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0; color: #10B981;">Datos del Cliente</h3>
              <div class="info-row">
                <span class="label">Nombre:</span> ${data.nombre}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> ${data.email}
              </div>
              <div class="info-row">
                <span class="label">Teléfono:</span> ${data.telefono}
              </div>
            </div>
            
            ${data.inmueble ? `
            <h3 style="color: #10B981;">Inmueble de Interés</h3>
            <div class="info-row">
              <span class="label">Tipo:</span> ${data.inmueble.tipo_nombre || 'N/A'}
            </div>
            <div class="info-row">
              <span class="label">Dirección:</span> ${data.inmueble.direccion || 'N/A'}
            </div>
            ${data.inmueble.precio ? `
            <div class="info-row">
              <span class="label">Precio:</span> ${data.inmueble.moneda === 'USD' ? 'US$' : '$'} ${Number(data.inmueble.precio).toLocaleString('es-AR')}
            </div>
            ` : ''}
            ` : ''}
            
            <h3 style="color: #10B981;">Mensaje del Cliente</h3>
            <p style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">${data.mensaje}</p>
            
            <div class="info-row">
              <span class="label">Fecha de Solicitud:</span> ${new Date().toLocaleDateString('es-AR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div class="footer">
            <p>Este email fue generado automáticamente desde KeyHub</p>
            <p>Por favor, contacta al cliente lo antes posible para coordinar la visita.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Plantilla HTML para email de contacto general
  getContactEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
          .header { background-color: #6366F1; color: white; padding: 20px; text-align: center; }
          .content { background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
          .info-row { margin-bottom: 15px; }
          .label { font-weight: bold; color: #6366F1; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <p>Has recibido un nuevo mensaje desde el formulario de contacto:</p>
            
            <div class="info-row">
              <span class="label">Nombre:</span> ${data.nombre}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="info-row">
              <span class="label">Asunto:</span> ${data.asunto}
            </div>
            <div class="info-row">
              <span class="label">Mensaje:</span>
              <p style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.mensaje}</p>
            </div>
            <div class="info-row">
              <span class="label">Fecha:</span> ${new Date().toLocaleDateString('es-AR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div class="footer">
            <p>Este email fue generado automáticamente desde KeyHub</p>
            <p>Responde directamente a ${data.email} para contactar al remitente.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Enviar email de consulta
  async sendConsultaEmail(consultaData, inmueble = null) {
    try {
      const data = {
        ...consultaData,
        inmueble
      };

      const subject = consultaData.tipo_consulta === 'VISITA' 
        ? `Nueva Solicitud de Visita - ${inmueble ? inmueble.direccion : 'Consulta General'}`
        : `Nueva Consulta - ${consultaData.nombre}`;

      const htmlContent = consultaData.tipo_consulta === 'VISITA'
        ? this.getVisitEmailTemplate(data)
        : this.getInfoEmailTemplate(data);

      const mailOptions = {
        from: this.fromEmail,
        to: this.recipientEmail, // Email de destino
        subject: subject,
        html: htmlContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado exitosamente:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error al enviar email:', error);
      return { success: false, error: error.message };
    }
  }

  // Enviar email de contacto general
  async sendContactEmail(contactData) {
    try {
      const subject = `Nuevo Mensaje de Contacto - ${contactData.asunto}`;
      const htmlContent = this.getContactEmailTemplate(contactData);

      const mailOptions = {
        from: this.fromEmail,
        to: this.recipientEmail,
        replyTo: contactData.email, // Para responder directamente al remitente
        subject: subject,
        html: htmlContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email de contacto enviado exitosamente:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error al enviar email de contacto:', error);
      return { success: false, error: error.message };
    }
  }

  // Enviar respuesta a consulta
  async sendRespuestaConsulta(respuestaData) {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
            .highlight { background-color: #EEF2FF; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4F46E5; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .label { font-weight: bold; color: #4F46E5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Respuesta a tu Consulta</h1>
            </div>
            <div class="content">
              <p>Hola ${respuestaData.nombreCliente},</p>
              <p>Hemos recibido tu consulta y queremos responderte:</p>
              
              <div class="highlight">
                ${respuestaData.mensaje.replace(/\n/g, '<br>')}
              </div>
              
              ${respuestaData.inmuebleInfo ? `
              <p style="margin-top: 20px;"><strong>Respecto al inmueble:</strong></p>
              <p style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">
                ${respuestaData.inmuebleInfo}
              </p>
              ` : ''}
              
              <p style="margin-top: 20px;">
                Si tienes más preguntas, no dudes en contactarnos respondiendo a este email o llamándonos.
              </p>
              
              <p style="margin-top: 20px;">
                <strong>Saludos cordiales,</strong><br>
                El equipo de KeyHub
              </p>
            </div>
            <div class="footer">
              <p>Este email fue generado desde KeyHub - Tu plataforma inmobiliaria de confianza</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const mailOptions = {
        from: this.fromEmail,
        to: respuestaData.emailCliente,
        subject: `Re: Consulta #${respuestaData.consultaId} - KeyHub`,
        html: htmlContent,
        replyTo: this.fromEmail
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Respuesta enviada exitosamente:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
