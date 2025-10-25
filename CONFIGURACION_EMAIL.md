# Configuración de Emails

## Pasos para configurar

1. **Copia el archivo .env.example a .env** (si no existe)
2. **Configura las variables de email en tu archivo .env:**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_app
EMAIL_FROM=KeyHub <tu_email@gmail.com>
EMAIL_RECIPIENT=destino@example.com
```

3. **Para Gmail:** Crea una contraseña de aplicación en https://myaccount.google.com/apppasswords

## Funcionamiento

- **Formulario de Consultas/Visitas:** Al enviar una consulta o agendar visita sobre un inmueble, se envía un email a `EMAIL_RECIPIENT`
- **Formulario de Contacto:** Al enviar el formulario de contacto general, se envía un email a `EMAIL_RECIPIENT`
- El botón muestra animación de carga y luego un check verde al completarse
- Las plantillas HTML cambian según el tipo:
  - VISITA: Email con formato verde para agendas de visita
  - INFORMACION: Email con formato azul para consultas
  - CONTACTO: Email con formato violeta para contacto general

## Variables importantes

- `EMAIL_RECIPIENT`: Email donde llegarán las notificaciones
- `EMAIL_FROM`: Email remitente (debe coincidir con EMAIL_USER)
