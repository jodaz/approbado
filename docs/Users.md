# Rutas de usuario

Todas las rutas de usuario empiezan con la base `/users`.

## Obtener un usuario

### Parámetros

```
/users/:id
```

```
/users/profile/:username
```

### Rutas

- `/users/:id` (**GET**): Devuelve un usuario y su perfil (Busqueda por ID).
- `/users/profile/:username` (**GET**): Devuelve un usuario y su perfil (Busqueda por nombre de usuario).
