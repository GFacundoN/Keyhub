# 🏢 Generador Masivo de Inmuebles

## 📊 ¿Qué hace este script?

Genera **45 inmuebles de ejemplo** completos para poblar tu base de datos:
- ✅ **20 inmuebles en VENTA**
- ✅ **25 inmuebles en ALQUILER**

---

## 🎯 Distribución de Inmuebles

### **VENTAS (20 total)**
| Tipo | Cantidad | Rango de Precios |
|------|----------|------------------|
| 🏢 Departamentos | 10 | USD 89.000 - USD 280.000 / ARS 68M - 89M |
| 🏠 Casas | 5 | USD 295.000 - USD 620.000 |
| 🏪 Locales | 5 | USD 75.000 - USD 210.000 |

### **ALQUILERES (25 total)**
| Tipo | Cantidad | Rango de Precios |
|------|----------|------------------|
| 🏢 Departamentos | 15 | USD 1.100 - USD 2.200 / ARS 250.000 - 480.000 |
| 🏠 Casas | 5 | USD 2.500 - USD 4.500 / ARS 650.000 - 780.000 |
| 🏪 Locales | 5 | USD 1.200 - USD 1.800 / ARS 380.000 - 580.000 |

---

## 📍 Zonas Cubiertas

- **Centro** - Propiedades comerciales y departamentos
- **Palermo** - Mix de casas, departamentos y locales
- **Belgrano** - Departamentos y casas familiares
- **Recoleta** - Propiedades premium
- **Puerto Madero** - Departamentos de lujo

---

## 🚀 Cómo Ejecutar

### **Opción 1: MySQL Workbench**
1. Abre MySQL Workbench
2. Conecta a tu base de datos
3. Abre: `database/generar_inmuebles_masivos.sql`
4. Click en ⚡ **Execute** (o Ctrl+Shift+Enter)
5. ✅ ¡Listo! Verás mensajes de confirmación al final

### **Opción 2: Terminal/CMD**
```bash
cd "c:\Users\gando\Desktop\proyectos-tareas facu\Web Dinamicas - fabio\KeyHub"

mysql -u root -p inmobiliaria < database/generar_inmuebles_masivos.sql
```

---

## ⚠️ IMPORTANTE

**Este script ELIMINARÁ:**
- ❌ Todos los inmuebles existentes
- ❌ Registros de compra
- ❌ Registros de alquiler  
- ❌ Registros de visitas
- ❌ Registros de consultas
- ❌ Relaciones de amenidades

**¡Haz backup si tienes datos importantes!**

```bash
# Backup de seguridad
mysqldump -u root -p inmobiliaria > backup_antes_generar.sql
```

---

## 📋 Características de los Inmuebles Generados

Cada inmueble tiene:
- ✅ Código único (INM-V-001, INM-A-001, etc.)
- ✅ Tipo de operación (venta/alquiler)
- ✅ Precio y moneda (USD/ARS)
- ✅ Ubicación completa (zona, barrio, dirección)
- ✅ Características (m², ambientes, dormitorios, baños)
- ✅ Descripción detallada
- ✅ Disponible para consulta

---

## 📈 Después de Ejecutar

El script mostrará **3 reportes** automáticos:

### **1. Resumen por Tipo de Operación**
```
+-----------------+----------+------------------+
| tipo_operacion  | cantidad | precio_promedio  |
+-----------------+----------+------------------+
| alquiler        |       25 |       ...        |
| venta           |       20 |       ...        |
+-----------------+----------+------------------+
```

### **2. Distribución por Tipo**
```
+---------------+-----------------+----------+
| tipo          | tipo_operacion  | cantidad |
+---------------+-----------------+----------+
| Casa          | alquiler        |        5 |
| Casa          | venta           |        5 |
| Departamento  | alquiler        |       15 |
| Departamento  | venta           |       10 |
| Local         | alquiler        |        5 |
| Local         | venta           |        5 |
+---------------+-----------------+----------+
```

### **3. Listado Completo**
Muestra todos los inmuebles con precio, ubicación y características.

---

## ✅ Verificar en la Aplicación

1. **Reinicia el servidor:**
   ```bash
   npm start
   ```

2. **Visita las páginas:**
   - http://localhost:3000/inmuebles/ventas → **20 inmuebles**
   - http://localhost:3000/inmuebles/alquileres → **25 inmuebles**

3. **Prueba los filtros:**
   - ✅ Por precio (USD/ARS)
   - ✅ Por zona
   - ✅ Por tipo de propiedad
   - ✅ Por ambientes/dormitorios

---

## 🎨 Variedad de Datos

### **Precios Diversos**
- Desde ARS 250.000/mes hasta USD 4.500/mes
- Desde USD 75.000 hasta USD 620.000

### **Superficies Variadas**
- Monoambientes: 45-65 m²
- Departamentos 2 amb: 55-78 m²
- Departamentos 3 amb: 70-105 m²
- Casas: 150-320 m²
- Locales: 35-95 m²

### **Características Completas**
- Ambientes: 1 a 6
- Dormitorios: 0 a 5
- Baños: 1 a 5
- Cocheras: 0 a 3

---

## 💡 Casos de Uso

### **Para Desarrollo:**
- Probar filtros con datos reales
- Verificar diseño de tarjetas
- Testear paginación (si la agregas)
- Validar ordenamiento

### **Para Demos:**
- Mostrar variedad de propiedades
- Demostrar búsquedas
- Presentar el sistema completo

### **Para Testing:**
- Probar performance con datos
- Validar queries SQL
- Testear carga de páginas

---

## 🔄 Comparación con Otros Scripts

| Script | Inmuebles | Uso Recomendado |
|--------|-----------|-----------------|
| `reset_inmuebles_con_datos.sql` | 12 | Testing rápido, datos mínimos |
| **`generar_inmuebles_masivos.sql`** | **45** | **Desarrollo completo, demos** |

---

## 🆘 Troubleshooting

### Error: "Column doesn't exist"
**Solución:** Ejecuta primero `add_tipo_operacion.sql`

### Error: "Foreign key constraint fails"
**Solución:** El script ya desactiva FK checks, verifica que se ejecute completo

### No se ven inmuebles en la web
**Causas:**
1. Servidor no reiniciado → Reinicia: `npm start`
2. Filtros muy restrictivos → Limpia filtros
3. Campo `disponible = FALSE` → Revisa en BD

---

## 📊 Estadísticas Finales

```
✅ 45 inmuebles insertados
✅ 5 zonas cubiertas (Centro, Palermo, Belgrano, Recoleta, Puerto Madero)
✅ 3 tipos de propiedades (Departamentos, Casas, Locales)
✅ 2 monedas (USD y ARS)
✅ Precios variados y realistas
✅ Descripciones únicas y detalladas
```

---

## 🎉 ¡Listo para Usar!

Una vez ejecutado:
1. ✅ Tendrás una base de datos completa
2. ✅ Podrás probar todas las funcionalidades
3. ✅ Los filtros funcionarán perfectamente
4. ✅ Las vistas se verán profesionales

**¡Ejecuta el script y disfruta de tu base de datos poblada!** 🚀
