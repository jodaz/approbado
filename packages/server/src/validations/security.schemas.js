import User from '../models/User'
import bcrypt from 'bcrypt'

export const updatePassword = {
    curr_password: {
        custom: {
            options: async (value, { req }) => {
                const { user } = req;
                const match = await bcrypt.compare(value, user.password)

                if (!match) {
                    throw new Error("Contraseña incorrecta");
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
                    throw new Error("La nueva contraseña no debe ser igual a la anterior.");
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
