import { checkArray } from '../utils'

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
    }
};
