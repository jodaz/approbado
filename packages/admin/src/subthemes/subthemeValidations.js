const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    } else if (values.name.length < 6) {
        errors.name = 'El nombre debe tener al menos 6 caracteres'
    }
    if (!values.duration) {
        errors.duration = "Ingrese un tiempo límite.";
    }
    if (!values.award_id) {
        errors.award_id = "Seleccione un premio.";
    }

    return errors;
};

export default validate;
