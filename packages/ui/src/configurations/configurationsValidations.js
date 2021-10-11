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
