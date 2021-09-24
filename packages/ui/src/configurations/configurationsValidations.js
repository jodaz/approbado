export const validateCategory = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para la nueva categoría.";
    }

    return errors;
};

export const validateLevel = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para el nuevo nivel.";
    }

    return errors;
};
export const validateTriviaSettings = (values) => {
    const errors = {};

    if (!values.grant_certification) {
        errors.grant_certification = "Ingrese un nombre para el nuevo nivel.";
    }
    if (!values.time_limit) {
        errors.time_limit = "Ingrese un tiempo límite para las trivias.";
    }

    return errors;
};
