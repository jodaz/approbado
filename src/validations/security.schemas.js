import bcrypt from 'bcrypt'

export const updatePassword = {
    curr_password: {
        custom: {
            options: async (value, { req }) => {
                const { user } = req;
                const match = await bcrypt.compare(value, user.password)

                if (!match) {
                    throw new Error("invalid");
                }
            }
        }
    },
    new_password: {
        custom: {
            options: async (value, { req }) => {
                const { user } = req;
                const match = await bcrypt.compare(value, user.password)

                if (match) {
                    throw new Error("different");
                }
            }
        }
    },
    new_password_confirmed: {
        notEmpty: {
            errorMessage: 'Ingrese su contraseña'
        }
    }
};
