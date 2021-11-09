export const createForumSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Ingrese un nombre para el foro.'
        }
    },
    trivia_id: {
        notEmpty: {
            errorMessage: 'Seleccione una trivia en específico'
        }
    }
};
