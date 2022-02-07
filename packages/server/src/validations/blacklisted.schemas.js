export const createBlacklistedUserSchema = {
    is_restricted: {
        notEmpty: {
            errorMessage: 'Indique si estará en la lista negra o restringido.'
        }
    },
    user_id: {
        notEmpty: {
            errorMessage: 'Ingrese el usuario.'
        }
    },
};

