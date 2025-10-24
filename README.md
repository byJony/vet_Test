# Proyecto Veterinaria (APV)

Este proyecto consiste en un backend con Express/MongoDB y un frontend con React + Vite + Tailwind.

## Proxy de Vite (desarrollo)

- En desarrollo, todas las peticiones a `/api` desde el frontend se proxyean al backend para evitar CORS.
- Archivo: `Proyecto_Veterinaria/frontend/vite.config.js:1`
  - `server.proxy['/api'] -> http://localhost:4000`
- Axios usa base URL relativa en dev:
  - Archivo: `Proyecto_Veterinaria/frontend/src/config/axios.jsx:1`
  - En dev: `baseURL = '/api'`
  - En prod: `baseURL = "${import.meta.env.VITE_BACKEND_URL}/api"`

## Variables de entorno

- Frontend (`Proyecto_Veterinaria/frontend/.env`)
  - Basado en `Proyecto_Veterinaria/frontend/.env.example:1`
  - `VITE_BACKEND_URL=http://localhost:4000` (solo para build/preview/producción)

- Backend (`Proyecto_Veterinaria/backend/.env`)
  - Basado en `Proyecto_Veterinaria/backend/.env.example:1`
  - `PORT=4000`
  - `MONGO_URI=mongodb://localhost:27017/apv`
  - `JWT_SECRET=supersecret`
  - `FRONTEND_URL=http://localhost:5173,http://localhost:4173` (puedes añadir más orígenes separados por coma)
  - `GMAIL_USER` y `GMAIL_PASSWORD` (App Password de Gmail si habilitas emails)

## CORS (producción)

- El backend valida el origen a partir de `FRONTEND_URL` (permite múltiples orígenes y peticiones sin `origin` como Postman).
- Archivo: `Proyecto_Veterinaria/backend/index.js:1`

## Cómo ejecutar en desarrollo

- Backend:
  - `cd Proyecto_Veterinaria/backend`
  - Copia `.env.example` a `.env` y configura variables
  - `npm run dev` (escucha en `http://localhost:4000`)
- Frontend:
  - `cd Proyecto_Veterinaria/frontend`
  - Copia `.env.example` a `.env` y configura `VITE_BACKEND_URL`
  - `npm run dev` (Vite en `http://localhost:5173`)

## Build y preview

- Frontend: `npm run build` y `npm run preview` (usa `VITE_BACKEND_URL`).
- Backend: `npm start` con `.env` de producción y `FRONTEND_URL` apuntando a tu dominio del frontend.

