import { checkArray } from '../utils'

export const createScheduleSchema = {
    title: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    subtheme_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
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
