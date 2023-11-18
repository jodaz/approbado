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
                    throw new Error("notfound");
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
                    throw new Error("invalid");
                }
            }
        }
    }
}

export const validateNewPassword = {
    password: {
        notEmpty: {
            errorMessage: 'required'
        }
    },
    password_confirmed: {
        notEmpty: {
            errorMessage: 'repeat'
        }
    },
    ...validateVerifyToken
}
