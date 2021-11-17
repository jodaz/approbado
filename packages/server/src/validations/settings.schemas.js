export const createCategorySchema = {
    name: {
        notEmpty: {
            errorMessage: 'Ingrese un nombre para la categoría.'
        }
    }
};

export const createLevelSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Ingrese un nombre para el nivel.'
        }
    }
};
