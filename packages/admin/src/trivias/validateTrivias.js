export const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para el plan.";
    } else if (values.name.length < 6) {
        errors.name = 'El nombre debe tener al menos 6 caracteres'
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }
    if (!values.plans_ids) {
        errors.plans_ids = "Seleccione un plan.";
    }

    return errors;
};

export default validate
