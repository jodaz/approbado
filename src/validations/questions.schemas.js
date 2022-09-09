export const createQuestionSchema = {
    description: {
        notEmpty: {
            errorMessage: 'Ingrese una descripcińón'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione un nivel'
        }
    },
    explanation: {
        notEmpty: {
            errorMessage: 'Ingrese una explicación'
        }
    }
};

