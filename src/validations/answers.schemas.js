export const createAnswerSchema = {
    answers: {
        isArray: {
            errorMessage: 'Debe ser un array de respuestas',
        },
        custom: {
            options: (value, { req, path }) => {
                value.forEach((item, index) => {
                    if (typeof item !== 'object' || item === null) {
                        throw new Error(`El elemento en la posición ${index} debe ser un objeto`);
                    }
                    if (item.is_right === undefined) {
                        throw new Error(`El campo 'is_right' es requerido en ${path}[${index}]`);
                    }
                    if (item.option_id === undefined) {
                        throw new Error(`El campo 'option_id' es requerido en ${path}[${index}]`);
                    }
                    if (typeof item.is_right !== 'number') {
                        throw new Error(`El campo 'is_right' en ${path}[${index}] debe ser un número`);
                    }
                    if (typeof item.option_id !== 'number') {
                        throw new Error(`El campo 'option_id' en ${path}[${index}] debe ser un número`);
                    }
                });
                return true; // If all checks pass
            },
        },
    },
};
