import { User } from '../models'

const emailRule = async (value) => ({
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
    }
})

const providerRules = {
    provider: {
        notEmpty: {
            errorMessage: 'Ingrese el nombre del proveedor'
        },
    },
    key: {
        notEmpty: {
            errorMessage: 'Ingrese la llave del proveedor'
        },
    },
}

export const validateLoginSchema = {
    ...emailRule,
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    }
};

export const validateExternalLogin = {
    ...emailRule,
    ...providerRules
}

export const validateSendSMSCode = {
    ...emailRule,
    names: {
        notEmpty: {
            errorMessage: 'Ingrese su nombre'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    },
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
                    throw new Error("El número de teléfono se encuentra registrado");
                }
            }
        }
    },
};

export const validateRegisterSchema = {
    ...validateSendSMSCode,
    code: {
        notEmpty: {
            errorMessage: 'Ingrese el código de verificación para el teléfono'
        }
    }
}
