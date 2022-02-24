import { User } from '../models'

export const validateUserSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Ingrese su correo electrónico'
        },
        custom: {
            options: async (value, { req }) => {
                const { user: currUser } = req;

                if (currUser.email == value) return;

                const user = await User.query().findOne({
                    email: value
                });

                if (user) {
                    console.log("EROR")
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
