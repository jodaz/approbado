export const createCommentSchema = {
    description: {
        notEmpty: {
            errorMessage: 'Ingrese una descripcińón'
        }
    },
    explanation: {
        notEmpty: {
            errorMessage: 'Ingrese una explicación'
        }
    }
};

