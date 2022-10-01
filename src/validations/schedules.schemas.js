import { checkArray } from '../utils'
import { User } from '../models'

export const createScheduleSchema = {
    title: {
        isLength: {
            options: { min: 5 },
            errorMessage: 'El nombre de evento debe tener al menos 5 caracteres'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione un nivel'
        }
    },
    subtheme_id: {
        notEmpty: {
            errorMessage: 'Seleccione un subtema'
        }
    },
    users_ids: {
        custom: {
            options: async (value) => {
                const isValid = await checkArray(value);

                if (!isValid) {
                    throw new Error("Seleccione los usuarios a invitar");
                }
            }
        }
    },
    starts_at: {
        notEmpty: {
            errorMessage: 'Ingrese la fecha y hora para la trivia'
        }
    }
};

export const indexSchedulesByUser = {
    id: {
        in: ['query'],
        custom: {
            options: async (value) => {
                if (isNaN(value)) {
                    throw new Error("Invalid ID")
                } else {
                    const user = await User.query().findById(value);

                    if (!user) {
                        throw new Error("User not found");
                    }
                }
            }
        }
    },
};
