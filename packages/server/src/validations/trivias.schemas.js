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
    category_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    }
};

export const editTriviaSchema = {
    ...createTriviaSchema,
    plans_ids: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    }
};

export const createTriviaGrupalSchema = {
    link: {
        notEmpty: {
            errorMessage: 'Ingrese un link'
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Seleccione el tipo de trivia'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione un nivel'
        }
    },
    subtheme_id: {
        notEmpty: {
            errorMessage: 'Seleccione un subtema'
        }
    },
    user_ids: {
        notEmpty: {
            errorMessage: 'Seleccione los usuarios'
        }
    }
};


