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

export const validateByID = {
    id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Insert an ID'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    id: value
                })

                if (!user) {
                    throw new Error("User not found");
                }
            }
        }
    },
};

export const validateByUsername = {
    username: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Insert an username'
        },
        custom: {
            options: async (value) => {
                const user = await User.query().findOne({
                    user_name: value
                })

                if (!user) {
                    throw new Error("User not found");
                }
            }
        }
    },
};
