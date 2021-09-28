import { User } from '../models'

export const validateLoginSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    email: value
                });

                if (!user) {
                    throw new Error("Usuario no encontrado");
                }
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    }
};

export const validateSendSMSCode = {
    phone: {
        notEmpty: {
            errorMessage: 'Ingrese su número de teléfono'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    phone: value
                });

                if (user) {
                    throw new Error("El número de teléfono se encuntra registrado");
                }
            }
        }
    },
};

export const validateRegisterSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    email: value
                });

                if (user) {
                    throw new Error("Ya existe un usuario con ese correo");
                }
            }
        }
    },
    phone: {
        notEmpty: {
            errorMessage: 'Ingrese su teléfono'
        }
    },
    code: {
        notEmpty: {
            errorMessage: 'Ingrese el código de verificación para el teléfono'
        }
    },
    names: {
        notEmpty: {
            errorMessage: 'Ingrese su nombre'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    }
}
