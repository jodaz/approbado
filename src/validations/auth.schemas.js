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

const userNameRule = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    user_name: value
                });

                if (!user) {
                    throw new Error("Usuario no encontrado");
                }

                const blacklisted = await user.$relatedQuery('blacklisted')
                    .where('is_restricted', true);

                if (blacklisted) {
                    throw new Error("Su acceso ha sido restringido.");
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
    ...userNameRule,
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    }
};

export const validateAdminLoginSchema = {
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
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'La contraseña debe tener al menos 6 caracteres'
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
    user_name: {
        notEmpty: {
            errorMessage: 'Ingrese su nombre de usuario.'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    user_name: value
                });

                if (user) {
                    throw new Error("El nombre de usuario utilizado ya existe.");
                }
            }
        }
    },
    code: {
        notEmpty: {
            errorMessage: 'Ingrese el código de verificación para el teléfono'
        }
    }
}
