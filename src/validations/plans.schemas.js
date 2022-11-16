import { checkArray } from '../utils'

export const createPlanSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    amount: {
        notEmpty: {
            errorMessage: 'Ingrese un monto para la membresía'
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
};
