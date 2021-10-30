# Autenticación

Todo el proceso de autenticación se realiza desde el servidor, incluído el de las cuentas externas (Facebook, Google).

## Login

### Parámetros

```
/auth/login
{
    email: *required* (STRING),
    password: *required* (STRING),
}
```


```
/auth/external
{
    email: *required* (STRING),
    provider: *required* (STRING),
    key: *required* (STRING),
}
```

### Rutas

- `/auth/login` (**POST**): Devuelve un token JWT con los datos básicos del usuario (id, names, picture).

- `/auth/external` (**POST**): Devuelve un token JWT con los datos básicos del usuario (id, names, picture) en caso de que el usuario exista o se haya registrado previamente, sino devuelve `error(422)`. En caso de existir, guarda el perfil del usuario en la tabla `auth_providers`.

## Registro

### Parámetros
```
{
    email: *required* (STRING),
    names: *required* (STRING),
    password: *required* (STRING),
    phone: *required* (STRING),
    external: *required* (BOOLEAN:false|undefined) true|false
    code: *optional* (STRING),
    provider: *optional* (STRING) facebook|google,
    key: *optional* (STRING)
}
```

### Rutas
- `/auth/send` (**POST**): Toma todos los parámetros para el registro de un usuario, excepto los parámetros opcionales. Utiliza el servicio `Twilio` para enviar un código al teléfono. Devuelve `success: true` en caso de envío del código éxitoso, `error(500)` en caso de falla del servidor/Twilio.

- `/auth/register` (**POST**): Toma todos los parámetros para el registro de un usuario, incluyendo los parámetros opcionales. Utiliza el servicio `Twilio` para enviar un código al teléfono. Devuelve `success: true` en caso de envío del código éxitoso, `error(500)` en caso de falla del servidor/Twilio.

En caso de registrarse a través de una red social, el servidor registra los parámetros de la cuenta en la relación `auth_providers`.
