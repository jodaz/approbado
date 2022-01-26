export const createCommentSchema = {
    summary: {
        notEmpty: {
            errorMessage: 'Ingrese un mensaje'
        }
    },
    parent_id: {
        notEmpty: {
            errorMessage: 'Ingrese el foro'
        }
    }
};
