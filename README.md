

# Primera Entrega Autenticación y Autorización con Passport y JWT

## Descripción
Este proyecto implementa un sistema de autenticación y autorización de usuarios utilizando Node.js, Express, Passport y JSON Web Tokens (JWT). Se ha desarrollado un modelo de usuario seguro con encriptación de contraseña y estrategias de autenticación mediante Passport.

## Tecnologías Utilizadas
- Node.js
- Express
- Passport.js
- bcrypt.js
- JSON Web Tokens (JWT)

## Características Principales
### 1. Modelo de Usuario y Encriptación de Contraseña
- Se ha creado el modelo `User` con los campos requeridos.
- Implementación de encriptación de contraseña utilizando `bcrypt.hashSync`.
- Almacenamiento seguro de la contraseña en la base de datos.

### 2. Estrategias de Passport para Autorización y Autenticación
- Se han desarrollado y configurado estrategias de autenticación con Passport.
- Implementación de autenticación mediante JWT.
- Validación segura de credenciales de usuario.

### 3. Sistema de Login y Generación de Token JWT
- Los usuarios pueden autenticarse correctamente en el sistema.
- Se genera un token JWT válido tras un login exitoso.
- Uso del token JWT para acceder a rutas protegidas.

### 4. EstrategiAS
- Implementación de una estrategia  para validar al usuario autenticado.
- que devuelve los datos del usuario autenticado mediante el token JWT.
- Manejador de errores para tokens inválidos o inexistentes.
- Validación precisa y segura del usuario autenticado.

## CONFIGURACION

 Configurar variables de entorno en `.env`:
   ```env
  PORT=8080
  MONGO_URL="mongodb://localhost:27017/test"
  MONGO_ATLAS "mongodb+srv://.mongodb.net/e-commerce"
  SESSION_SECRET=
  JWT_SECRET="
   ```


## Uso
- **Registro de Usuario:** `POST /api/auth/register`
- **Login de Usuario:** `POST /api/auth/login`
- **Obtener Datos del Usuario Autenticado:** `GET /api/auth/current`


---
**Desarrollado con Node.js y Passport.js para una autenticación segura y eficiente.** 🚀

