import { User } from '../models'

const emailRule = {
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
}

const emailMobileRule = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
        }
    }
}

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

export const validateExternalMobileLogin = {
    ...emailMobileRule,
    ...providerRules
}

export const validateSendSMSCode = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
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
    },
    external: {
        notEmpty: {
            errorMessage: 'Ingrese si es o no una autenticación con cuenta externa (Facebook, Google).'
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
