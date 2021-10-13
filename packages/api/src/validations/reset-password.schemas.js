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
        custom: {
            options: async (value) => {
                PasswordReset.findOne({
                    token: value
                });

                if (!user) {
                    throw new Error("El link utilizado ha dejado de ser válido.");
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
    // Verificar que el token en el query sea valido
}
