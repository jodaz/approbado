export const createCategorySchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    }
};

export const createLevelSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    }
};

export const editTriviaSettingsSchema = {
    grant_certification: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    time_limit: {
        notEmpty: {
            errorMessage: 'Ingrese un tiempo total para la trivia'
        }
    }
};
