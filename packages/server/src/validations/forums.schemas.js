import { checkArray } from '../utils'

export const createForumSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Ingrese un nombre para el foro.'
        }
    },
    trivia_id: {
        notEmpty: {
            errorMessage: 'Seleccione una trivia en específico'
        }
    },
    categories_ids: {
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
