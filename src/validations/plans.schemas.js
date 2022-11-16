import { checkArray } from '../utils'

export const createPlanSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    trivias_in_teams: {
        notEmpty: {
            errorMessage: 'Ingrese una cantidad de trivias a acceder.'
        }
    },
    duration: {
        notEmpty: {
            errorMessage: 'Ingrese una duración del plan.'
        }
    },
    forum_access: {
        notEmpty: {
            errorMessage: 'Permitir o denegar el acceso al foro.'
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

                if (!value.length) {
                    throw new Error("Seleccione al menos una trivia");
                }
                if (!isValid) {
                    throw new Error("Seleccione al menos una trivia");
                }
            }
        }
    },
};
