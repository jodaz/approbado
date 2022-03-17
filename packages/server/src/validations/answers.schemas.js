export const createAnswerSchema = {
    is_right: {
        notEmpty: {
            errorMessage: 'Ingrese una descripcińón'
        }
    },
    user_id: {
        notEmpty: {
            errorMessage: 'Seleccione un nivel'
        }
    }
};

