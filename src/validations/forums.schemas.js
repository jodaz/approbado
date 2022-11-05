import { checkArray } from '../utils'

export const createForumSchema = {
    message: {
        notEmpty: {
            errorMessage: 'Ingrese un nombre para el foro.'
        }
    },
    trivias_ids: {
        custom: {
            options: async (value) => {
                const isValid = await checkArray(value);

                if (!isValid) {
                    throw new Error("Seleccione al menos una trivia");
                }
            }
        }
    },
    categories_ids: {
        custom: {
            options: async (value) => {
                const isValid = await checkArray(value);

                if (!isValid) {
                    throw new Error("Seleccione al menos una categoria");
                }
            }
        }
    }
};
