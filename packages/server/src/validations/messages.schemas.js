import { Chat } from '../models'

export const createMessageSchema = {
    id: {
        in: ['params'],
        notEmpty: {
            errorMensage: 'Seleccione un chat'
        },
        custom: {
            options: async (value) => {
                const chat = await Chat.query().findById(value);

                if (!chat) {
                    throw new Error("Chat no encontrado");
                }
            }
        }
    },
    message: {
        notEmpty: {
            errorMensage: 'Ingrese un mensaje'
        }
    }
}
