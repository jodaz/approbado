export const createAnswerSchema = {
    is_right: {
        notEmpty: {
            errorMessage: 'Ingrese si fue correcta o no'
        }
    },
    option_id: {
        notEmpty: {
            errorMessage: 'Ingrese la opción'
        }
    }
};

