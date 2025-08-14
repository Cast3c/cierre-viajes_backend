<p align="center">
    <img src="./public/Cierre-viajes.png" alt="App de viajes banner" width="100%">
<p>

## 📦 Sistema de Gestión de Viajes – Backend
Aplicación backend desarrollada con Node.js y Express, diseñada para gestionar viajes, incluyendo creación, actualización, listado y cierre de viajes. El proyecto sigue una arquitectura modular con separación de responsabilidades en controladores, servicios y utilidades.

---

## 🚀 Características
API REST para gestión de viajes.

Generación automática de IDs únicos según la información de cada viaje.

Logger integrado para depuración en desarrollo (opcional en producción).

Arquitectura escalable y fácil de mantener.

Compatible con Windows, Linux y macOS.

---

## 📂 Estructura del proyecto

project-root/
├── controllers/       # Lógica para manejar las solicitudes HTTP
├── services/          # Lógica de negocio y conexión con la capa de datos
├── utils/             # Funciones auxiliares (ej. generador de IDs)
├── routes/            # Definición de rutas API
├── middlewares/       # Middlewares personalizados
├── config/            # Configuración y variables de entorno
├── index.js           # Punto de entrada del servidor
├── package.json       # Dependencias y scripts
└── README.md

---

## ⚙️ Instalación

    # Clonar el repositorio
    git clone https://github.com/tu-usuario/tu-repo.git

    # Entrar al directorio
    cd tu-repo

    # Instalar dependencias
    npm install
---

## ▶️ Uso en desarrollo

npm run dev

---

## 🖥️ Tecnologías Utilizadas
- Node.js

- Express

- Morgan (middleware de logging)

- CORS

- Nodemon (modo desarrollo)

- Dotenv (gestión de variables de entorno)

---


## package.json

If the script does not work on Windows, confirm that you are using Powershell and not Command Prompt. If you have installed Git Bash or another Linux-like terminal, you may be able to run Linux-like commands on Windows as well.