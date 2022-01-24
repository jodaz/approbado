export const createSubthemeSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    points: {
        notEmpty: {
            errorMessage: 'Ingrese un numero de puntos'
        }
    },
    duration: {
        notEmpty: {
            errorMessage: 'Ingrese la duración'
        }
    },
    trivia_id: {
        notEmpty: {
            errorMessage: 'Seleccione una trivia'
        }
    },
    award_id: {
        notEmpty: {
            errorMessage: 'Seleccione un premio'
        }
    }
};
