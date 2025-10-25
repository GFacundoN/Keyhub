# 🔄 Cambios: Sistema de Ventas y Alquileres

## 📋 Resumen de Cambios

Se ha implementado un sistema donde los inmuebles se clasifican directamente como **VENTA** o **ALQUILER**, eliminando la vista general de "Inmuebles" y dejando solo dos categorías en el navegador.

---

## ✅ Cambios Implementados

### **1. Base de Datos**
- ✅ Nuevo campo `tipo_operacion` en la tabla `inmueble`
- ✅ Valores posibles: `'venta'` o `'alquiler'`

### **2. Navegación**
- ✅ **Eliminado**: Link "Inmuebles" del navbar
- ✅ **Mantenido**: Links "Alquileres" y "Ventas"

### **3. Formularios**
- ✅ Formulario de **crear inmueble**: Campo "Tipo de Operación" agregado
- ✅ Formulario de **editar inmueble**: Campo "Tipo de Operación" agregado

### **4. Modelos y Controladores**
- ✅ Modelo: Filtrado automático por `tipo_operacion`
- ✅ Controlador: Manejo de `tipo_operacion` al crear/editar

### **5. Vistas**
- ✅ `/inmuebles/ventas` - Solo muestra inmuebles con `tipo_operacion = 'venta'`
- ✅ `/inmuebles/alquileres` - Solo muestra inmuebles con `tipo_operacion = 'alquiler'`

---

## 🚀 Pasos para Activar los Cambios

### **Paso 1: Actualizar Base de Datos** ⚠️ **CRÍTICO**

Ejecuta este SQL en tu base de datos:

```sql
USE inmobiliaria;

-- Agregar columna tipo_operacion
ALTER TABLE inmueble 
ADD COLUMN tipo_operacion ENUM('venta', 'alquiler') NOT NULL DEFAULT 'venta'
COMMENT 'Tipo de operación: venta o alquiler'
AFTER disponible;

-- Actualizar inmuebles existentes (opcional: ajusta según necesites)
-- Por defecto, todos se marcan como venta
UPDATE inmueble 
SET tipo_operacion = 'venta'
WHERE tipo_operacion IS NULL;

-- Verificar
SELECT id, direccion, tipo_operacion, disponible 
FROM inmueble 
LIMIT 10;
```

**O ejecuta el archivo SQL:**
```bash
mysql -u root -p inmobiliaria < database/add_tipo_operacion.sql
```

---

### **Paso 2: Reiniciar el Servidor**

```bash
# Detener el servidor (Ctrl+C)
# Luego iniciarlo nuevamente
npm start
```

---

### **Paso 3: Verificar Funcionamiento**

1. **Ir a** http://localhost:3000/
2. **Verificar navbar**: Solo debe aparecer "Alquileres" y "Ventas" (sin "Inmuebles")
3. **Click en "Alquileres"**: Debe mostrar solo inmuebles con `tipo_operacion = 'alquiler'`
4. **Click en "Ventas"**: Debe mostrar solo inmuebles con `tipo_operacion = 'venta'`

---

### **Paso 4: Crear un Inmueble de Prueba**

1. **Login** como admin o agente
2. **Click en** "Administración" → "Nuevo Inmueble"
3. **Llenar el formulario** incluyendo:
   - Tipo de Inmueble: Departamento
   - **Tipo de Operación**: **Venta** o **Alquiler** ← NUEVO CAMPO
   - Zona, dirección, etc.
4. **Guardar**
5. **Verificar** que aparece en la sección correcta (Ventas o Alquileres)

---

## 📊 Estructura del Sistema

### **Navegación Actualizada:**

```
Inicio | Alquileres | Ventas | Acerca de | Contacto
```

### **Flujo de Inmuebles:**

```
Crear Inmueble
     ↓
Seleccionar: Venta o Alquiler
     ↓
     ├─→ tipo_operacion = 'venta'  → Aparece en /inmuebles/ventas
     └─→ tipo_operacion = 'alquiler' → Aparece en /inmuebles/alquileres
```

---

## 🔍 Detalles Técnicos

### **Campo `tipo_operacion`**

| Campo | Tipo | Valores | Default |
|-------|------|---------|---------|
| `tipo_operacion` | ENUM | 'venta', 'alquiler' | 'venta' |

### **Filtrado en Modelos:**

**Ventas:**
```javascript
WHERE i.tipo_operacion = 'venta' AND i.disponible = TRUE
```

**Alquileres:**
```javascript
WHERE i.tipo_operacion = 'alquiler' AND i.disponible = TRUE
```

---

## 📝 Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `database/add_tipo_operacion.sql` | ✅ Creado - Script SQL |
| `views/partials/navbar.ejs` | ✅ Modificado - Eliminado link "Inmuebles" |
| `models/Inmueble.js` | ✅ Modificado - Filtrado por tipo_operacion |
| `views/inmuebles/create.ejs` | ✅ Modificado - Campo tipo_operacion |
| `views/inmuebles/edit.ejs` | ✅ Modificado - Campo tipo_operacion |
| `controllers/inmueblesController.js` | ✅ Modificado - Manejo tipo_operacion |

---

## 🧪 Testing

### **Test 1: Crear Venta**
```
1. Crear inmueble con tipo_operacion = 'venta'
2. Ir a /inmuebles/ventas
✅ Debe aparecer el inmueble
3. Ir a /inmuebles/alquileres
✅ NO debe aparecer
```

### **Test 2: Crear Alquiler**
```
1. Crear inmueble con tipo_operacion = 'alquiler'
2. Ir a /inmuebles/alquileres
✅ Debe aparecer el inmueble
3. Ir a /inmuebles/ventas
✅ NO debe aparecer
```

### **Test 3: Editar Tipo de Operación**
```
1. Editar un inmueble de venta
2. Cambiar tipo_operacion a 'alquiler'
3. Guardar
4. Verificar que ahora aparece en Alquileres
✅ Debe moverse de sección
```

---

## ⚠️ Consideraciones Importantes

### **Inmuebles Existentes:**
Todos los inmuebles existentes se marcarán por defecto como **'venta'**. Si deseas que algunos sean alquileres:

```sql
-- Ejemplo: Cambiar inmuebles específicos a alquiler
UPDATE inmueble 
SET tipo_operacion = 'alquiler' 
WHERE id IN (1, 2, 3);  -- Reemplaza con los IDs correctos
```

### **Disponibilidad:**
Los inmuebles deben tener `disponible = TRUE` para aparecer en las listas.

```sql
-- Asegurar que todos están disponibles
UPDATE inmueble 
SET disponible = TRUE;
```

---

## 🎯 Ventajas del Nuevo Sistema

| Antes | Ahora |
|-------|-------|
| ❌ Link "Inmuebles" genérico | ✅ Links específicos: "Ventas" y "Alquileres" |
| ❌ Difícil filtrar ventas/alquileres | ✅ Separación automática |
| ❌ Usuario ve todo mezclado | ✅ Usuario ve solo lo que busca |
| ❌ Requiere tablas adicionales | ✅ Un solo campo simple |

---

## 🔧 Troubleshooting

### **Error: "Unknown column 'tipo_operacion'"**
**Solución:** Ejecuta el script SQL del Paso 1

### **Los inmuebles no aparecen en ninguna sección**
**Causas posibles:**
1. `disponible = FALSE` → Ejecuta: `UPDATE inmueble SET disponible = TRUE;`
2. `tipo_operacion` es NULL → No debería pasar con el ALTER TABLE

### **El navbar todavía muestra "Inmuebles"**
**Solución:** Limpia la caché del navegador (Ctrl+Shift+R) o reinicia el servidor

---

## ✨ ¡Todo Listo!

Una vez ejecutado el SQL del **Paso 1**, el sistema estará completamente funcional con la nueva estructura de Ventas y Alquileres.

**📌 Orden de ejecución:**
1. ✅ Ejecutar SQL
2. ✅ Reiniciar servidor
3. ✅ Probar en el navegador
4. ✅ Crear inmueble de prueba

**🎉 ¡Disfruta tu nuevo sistema de Ventas y Alquileres!**
