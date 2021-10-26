import { User } from '../models'

export const validateUserSchema = {
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
    names: {
        notEmpty: {
            errorMessage: 'Ingrese su nombre'
        }
    }
}
