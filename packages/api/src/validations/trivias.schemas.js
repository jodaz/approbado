export const createTriviaSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    is_free: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    category_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    }
};