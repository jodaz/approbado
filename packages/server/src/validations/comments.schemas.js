export const createCommentSchema = {
    message: {
        notEmpty: {
            errorMessage: 'Ingrese un mensaje'
        }
    },
    forum_id: {
        notEmpty: {
            errorMessage: 'Ingrese el foro'
        }
    }
};
