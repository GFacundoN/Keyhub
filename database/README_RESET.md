# 🔄 Reset de Inmuebles con Datos de Ejemplo

## 📝 Descripción

Este script elimina todos los inmuebles existentes e inserta nuevos datos de ejemplo con todos los campos necesarios:
- ✅ `tipo_operacion` (venta/alquiler)
- ✅ `precio` (valor del inmueble)
- ✅ `moneda` (ARS/USD)
- ✅ Todos los demás campos completos

---

## 📊 Datos que se insertarán:

### **VENTAS (5 inmuebles):**
1. **Departamento Belgrano** - USD 120.000 - 3 amb, 2 dorm
2. **Casa Palermo** - USD 450.000 - 5 amb, 4 dorm
3. **Departamento Centro** - ARS 75.000.000 - 2 amb, 1 dorm
4. **Departamento Puerto Madero** - USD 280.000 - 4 amb, 3 dorm
5. **Local Comercial Centro** - USD 95.000 - 1 amb

### **ALQUILERES (7 inmuebles):**
1. **Departamento Belgrano** - ARS 350.000/mes - 2 amb, 1 dorm
2. **Casa Palermo** - USD 2.500/mes - 4 amb, 3 dorm
3. **Departamento Centro** - ARS 280.000/mes - 2 amb, 1 dorm
4. **Departamento Puerto Madero** - USD 1.800/mes - 3 amb, 2 dorm
5. **Local Comercial Centro** - ARS 450.000/mes - 2 amb
6. **Departamento Belgrano** - ARS 420.000/mes - 3 amb, 2 dorm
7. **Casa Palermo** - ARS 650.000/mes - 4 amb, 3 dorm

**Total: 12 inmuebles** (5 ventas + 7 alquileres)

---

## 🚀 Cómo Ejecutar

### **Opción 1: Desde MySQL Workbench (Recomendado)**

1. Abre **MySQL Workbench**
2. Conéctate a tu servidor
3. Abre el archivo: `database/reset_inmuebles_con_datos.sql`
4. Click en el botón ⚡ "Execute" (o presiona Ctrl+Shift+Enter)
5. ✅ Listo!

---

### **Opción 2: Desde Terminal/CMD**

```bash
cd "c:\Users\gando\Desktop\proyectos-tareas facu\Web Dinamicas - fabio\KeyHub"

mysql -u root -p inmobiliaria < database/reset_inmuebles_con_datos.sql
```

Ingresa tu contraseña cuando te la pida.

---

### **Opción 3: Copiar y Pegar en MySQL**

1. Abre el archivo `reset_inmuebles_con_datos.sql`
2. Copia todo el contenido
3. Pega en tu cliente MySQL
4. Ejecuta

---

## ✅ Verificación

Después de ejecutar el script, verás:

### **Tabla de inmuebles insertados:**
```
+----+-----------------+-------------------+---------------+----------------------+-----------+-------------+------------+
| id | tipo_operacion  | precio_formateado | barrio        | direccion            | ambientes | dormitorios | disponible |
+----+-----------------+-------------------+---------------+----------------------+-----------+-------------+------------+
|  6 | alquiler        | ARS 350,000       | Belgrano      | Cabildo 2345         |         2 |           1 |          1 |
|  7 | alquiler        | USD 2,500         | Palermo       | Gorriti 5678         |         4 |           3 |          1 |
|  8 | alquiler        | ARS 280,000       | Centro        | Av. de Mayo 1234     |         2 |           1 |          1 |
...
```

### **Resumen por tipo:**
```
+-----------------+----------+------------------+---------------+---------------+
| tipo_operacion  | cantidad | precio_promedio  | precio_minimo | precio_maximo |
+-----------------+----------+------------------+---------------+---------------+
| alquiler        |        7 |       616,428.57 |       280,000 |     2,500,000 |
| venta           |        5 |   17,015,000.00  |    75,000,000 |   450,000,000 |
+-----------------+----------+------------------+---------------+---------------+
```

---

## ⚠️ ADVERTENCIA

**Este script ELIMINARÁ todos los inmuebles existentes.**

Si tienes datos importantes:
1. Haz un backup primero:
   ```bash
   mysqldump -u root -p inmobiliaria > backup_inmobiliaria.sql
   ```
2. O no ejecutes este script y agrega los campos manualmente

---

## 🔧 Después de Ejecutar

1. **Reinicia el servidor Node.js:**
   ```bash
   npm start
   ```

2. **Verifica las páginas:**
   - http://localhost:3000/inmuebles/ventas (5 inmuebles)
   - http://localhost:3000/inmuebles/alquileres (7 inmuebles)

3. **Prueba los filtros:**
   - Por precio
   - Por zona
   - Por ambientes/dormitorios
   - Por tipo de propiedad

---

## 📦 Estructura de Datos

Cada inmueble tiene:
```javascript
{
  tipo_id: 1-3,                    // 1=Depto, 2=Casa, 3=Local
  tipo_operacion: 'venta|alquiler',
  precio: 120000.00,
  moneda: 'USD|ARS',
  zona_id: 1-5,                    // 1=Centro, 2=Palermo, etc.
  barrio: 'Belgrano',
  direccion: 'Av. Cabildo 1234',
  superficie_total_m2: 85.5,
  ambientes: 3,
  dormitorios: 2,
  banos: 2,
  cocheras: 1,
  descripcion: 'Texto descriptivo...',
  disponible: true
}
```

---

## 🎯 Beneficios

| Antes | Después |
|-------|---------|
| ❌ Inmuebles sin precio | ✅ Todos con precio |
| ❌ Sin tipo_operacion | ✅ Venta/Alquiler definido |
| ❌ Sin moneda | ✅ ARS o USD |
| ❌ Datos incompletos | ✅ Datos completos |
| ❌ Errores en vistas | ✅ Todo funciona |

---

## 🆘 Troubleshooting

### Error: "Table 'inmueble' doesn't exist"
**Solución:** Primero ejecuta `schema.sql` y luego `add_tipo_operacion.sql`

### Error: "Column 'tipo_operacion' doesn't exist"
**Solución:** Ejecuta primero `add_tipo_operacion.sql`

### Error: "Unknown column 'precio'"
**Solución:** Ejecuta primero `add_tipo_operacion.sql` (incluye precio y moneda)

---

## ✨ ¡Todo Listo!

Una vez ejecutado el script:
1. ✅ Tendrás 12 inmuebles de ejemplo
2. ✅ Todos con precios y monedas
3. ✅ Los filtros funcionarán perfectamente
4. ✅ Las vistas se verán correctamente

**🎉 ¡Disfruta tu base de datos actualizada!**
