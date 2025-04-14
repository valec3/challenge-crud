
# 🍕 Sistema de Pedidos de Pizza

Sistema completo de pedidos de pizza con panel administrativo y gestión de órdenes en tiempo real.

## 🌐 Demo en Vivo

[Visitar Pizza Best](https://pizza-best.vercel.app)

## ✨ Características Principales

- 📱 Diseño responsive para todos los dispositivos
- 🛒 Gestión de pedidos en tiempo real
- 🔄 Actualización dinámica del menú
- 📦 Administración de productos y categorías
- 💳 Sistema de seguimiento de pedidos

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Router DOM
- Axios
- Sonner (notificaciones)

### Backend
- Node.js con Express
- Firebase Admin (Base de datos)
- Express Validator
- Sistema de configuración con dotenv

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase (para el backend)

### Configuración del Frontend
```bash
cd front
npm install
npm run dev
```

### Configuración del Backend
```bash
cd back
npm install
# Crear archivo .env basado en .env.example
npm run dev
```

## 📁 Estructura del Proyecto

### Frontend
```
front/
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── hooks/         # Hooks personalizados
│   ├── pages/         # Páginas principales
│   ├── services/      # Capa de servicios API
│   └── lib/          # Utilidades y tipos
```

### Backend
```
back/
├── src/
│   ├── controllers/   # Controladores
│   ├── models/        # Modelos de datos
│   ├── services/      # Lógica de negocio
│   └── routes/        # Rutas API
```

## 📝 Funcionalidades Principales

### Panel de Administración
- Gestión de productos
- Gestión de categorías
- Visualización de pedidos
- Actualización de estado de pedidos

### Área de Cliente
- Visualización del menú por categorías
- Carrito de compras
- Proceso de pedido
- Seguimiento de estado

## 🔧 Configuración

### Variables de Entorno Frontend
```env
VITE_API_URL=http://localhost:3000/api
```

### Variables de Entorno Backend
```env
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=ruta/a/firebase-key.json
```

## 📡 API Endpoints

### Productos
- `GET /products` - Obtener todos los productos
- `POST /products` - Crear nuevo producto
- `DELETE /products/:id` - Eliminar producto

### Categorías
- `GET /categories` - Obtener todas las categorías
- `POST /categories` - Crear nueva categoría
- `DELETE /categories/:id` - Eliminar categoría

### Pedidos
- `GET /orders` - Obtener todos los pedidos
- `POST /orders` - Crear nuevo pedido
- `PUT /orders/:id` - Actualizar estado del pedido
