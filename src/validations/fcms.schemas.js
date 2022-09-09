import { User } from '../models'

export const createFcmSchema = {
    user_id: {
        notEmpty: {
            errorMessage: 'Ingrese el id del usuario'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    id: value
                });

                if (!user) {
                    throw new Error("Usuario no encontrado");
                }
            }
        }
    },
    token: {
        notEmpty: {
            errorMessage: 'Ingrese el token'
        }
    }
}
