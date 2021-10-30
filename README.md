# Approbado Web

## Requerimientos

- `postgres ^12`
- `node.js ^14`
- `sshpass` para utilizar el script de deployment

## Documentación

## Arquitectura actual

```
-- docs
-- packages
------ admin
------ app
------ db
------ frames
------ lib
-- utils
```

- `admin`: UI del panel de administradores
- `db`: Scaffolding para la base de datos
- `frames`: Componentes destinados a ser servidos dentro de iframes: carousel de compras, login, registro...
- `app`: UI de la aplicación web para usuarios
- `lib`: Librerías y utilidades para el front y back. Aquí alojo componentes, temas, etc..

### Librerías por desarrollar
- `api`: Enrutado y servicios de la api
    - Actual: API `routes`, , `validations`, `index.js`
- `lib/configs`: Configs del server
