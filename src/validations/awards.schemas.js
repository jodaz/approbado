export const createAwardSchema = {
    title: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    min_points: {
        notEmpty: {
            errorMessage: 'Ingrese un numero de puntos'
        }
    },
    file: {
        custom: {
            options: async (value, { req }) => {
                if(!req.file) {
                    throw new Error("Enter a file");
                }
            }
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Seleccione una tipo'
        }
    },
    trivia_id: {
        notEmpty: {
            errorMessage: 'Seleccione una trivia'
        }
    }
};
