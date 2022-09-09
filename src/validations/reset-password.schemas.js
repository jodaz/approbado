import { User, PasswordReset } from '../models'

export const validateResetPassword = {
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
};

export const validateVerifyToken = {
    token: {
        in: ['query'],
        custom: {
            options: async (value) => {
                const token = await PasswordReset.query().findOne({
                    token: value
                });

                if (!token) {
                    throw new Error("El vínculo utilizado ha dejado de ser válido.");
                }
            }
        }
    }
}

export const validateNewPassword = {
    password: {
        notEmpty: {
            errorMessage: 'Ingrese su nueva contraseña'
        }
    },
    password_confirmed: {
        notEmpty: {
            errorMessage: 'Repita su contraseña'
        }
    },
    ...validateVerifyToken
}
