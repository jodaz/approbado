# Approbado Web

## Requerimientos

## Arquitectura actual

- `dashboard`: UI del panel de administradores
- `auth`: Componentes relacionados a la autenticación
- `db`: Scaffolding para la base de datos
- `plans`: Carousel de compras
- `components`: Librería de componentes compartidos

### Librerías por desarrollar
- `app`: UI de la aplicación web para usuarios
- `http`: Servicios de la API (Controladores, validadores, enrutado...). Punto de entrada para las peticiones.
    - Actual: API `controllers`, `models`, `resources`
- `server`: Enrutado, configuración del servidor
    - Actual: API `routes`, `server.js`
- `lib`: Librerías y utilidades del server
    - Actual: API `utils`, `config`, `validations`
