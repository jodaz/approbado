import { checkArray } from '../utils'

export const createChatSchema = {
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

export const updateChatSchema = {
    status: {
        notEmpty: {
            errorMessage: 'Ingrese el status'
        }
    }
};


