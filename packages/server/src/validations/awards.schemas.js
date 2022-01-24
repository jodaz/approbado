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
