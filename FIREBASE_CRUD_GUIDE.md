# Firebase CRUD - Guía de Usuario

## 📱 Pantalla Firebase CRUD

Esta pantalla implementa un sistema completo de **Create, Read, Update, Delete (CRUD)** conectado a Firebase Realtime Database.

## 🚀 Características

### ✅ **Funcionalidades Implementadas:**

1. **📖 Listar Usuarios (READ)**
   - Muestra todos los usuarios en tarjetas
   - Información completa: nombre, email, género, IP, ID
   - Actualización en tiempo real desde Firebase
   - Pull-to-refresh para recargar datos

2. **➕ Agregar Usuario (CREATE)**
   - Botón "Add New User" en la parte superior
   - Formulario completo con validación
   - Campos: ID (opcional), Nombre, Apellido, Email, Género, IP
   - Guardado automático en Firebase

3. **✏️ Editar Usuario (UPDATE)**
   - Icono de lápiz azul en cada tarjeta
   - Pre-rellena el formulario con datos actuales
   - Actualiza en tiempo real en Firebase

4. **🗑️ Eliminar Usuario (DELETE)**
   - Icono de basurero rojo en cada tarjeta
   - Confirmación antes de eliminar
   - Eliminación inmediata de Firebase

## 🎨 Diseño

- **Header azul** con contador de usuarios
- **Tarjetas** organizadas verticalmente
- **Badges de color** para género:
  - 🔵 Azul: Male
  - 🔴 Rojo: Female
  - 🟢 Verde: Genderfluid/Non-binary/Other
- **Iconos de acción** en cada tarjeta
- **Scroll suave** con RefreshControl

## 📊 Estructura de Datos

```json
{
  "-OeZ1mjAnG7x_kzxwWl3": {
    "id": 10,
    "first_name": "Kimmie",
    "last_name": "Fellenor",
    "email": "kfellenor9@wired.com",
    "gender": "Female"
  }
}
```

**Campos:**
- `id`: Número único de usuario
- `first_name`: Nombre
- `last_name`: Apellido
- `email`: Correo electrónico
- `gender`: Género (Male, Female, Genderfluid, Non-binary, Other)

## 🔥 Firebase Configuration

La app está conectada a:
- **Database URL:** `https://apps-multiplataforma-default-rtdb.firebaseio.com`
- **Path:** `/users`
- **Tipo:** Realtime Database
- **Configuración:** Centralizada en `config/firebase.js`

### 📁 Archivo de Configuración

```javascript
// config/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuración centralizada
const firebaseConfig = { ... };

// Inicialización única
let app;
let database;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

database = getDatabase(app);

export { app, database };
export default database;
```

**Uso en otros archivos:**
```javascript
import database from '../config/firebase';
```

## 📝 Validaciones

El formulario valida:
- ✅ Nombre requerido
- ✅ Apellido requerido
- ✅ Email requerido y válido (@)
- ✅ ID auto-generado si está vacío
- ✅ Género seleccionable (5 opciones)

## 🎯 Navegación

1. Desde el menú drawer, selecciona **"Firebase CRUD"**
2. Para agregar: presiona el botón verde **"Add New User"**
3. Para editar: presiona el icono de lápiz azul
4. Para eliminar: presiona el icono de basurero rojo

## 🛠️ Componentes Utilizados

- **Gluestack UI:** Card, Button, Icon, Badge, Input, Select
- **React Navigation:** Stack Navigator dentro de Drawer
- **Firebase SDK:** Realtime Database
- **Lucide Icons:** User, Edit, Trash2, Plus, Save

## 📱 Responsive

- Funciona en Android, iOS y Web
- Keyboard avoiding para formularios
- ScrollView para contenido largo
- Pull-to-refresh nativo

## ⚡ Tiempo Real

Todos los cambios se sincronizan automáticamente:
- Si otro usuario agrega/edita/elimina, verás los cambios inmediatamente
- No necesitas refrescar manualmente
- Conexión persistente con Firebase

## 🎓 Basado en Tutorial

Diseño inspirado en: [YouTube Tutorial](https://www.youtube.com/watch?v=LvmJ7WFE4HM)

Con mejoras:
- ✨ Mejor UI con Gluestack
- 🎨 Colores más modernos
- 📱 Mejor experiencia móvil
- 🔄 Refresh automático
- ✅ Validación completa
