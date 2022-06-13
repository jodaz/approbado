export const validatePlan = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para el plan.";
    } else if (values.name.length < 6) {
        errors.name = 'El nombre debe tener al menos 6 caracteres'
    }
    if (!values.duration && values.amount != 0) {
        errors.duration = "Ingrese la duración de la membresía.";
    }
    if (!values.forum_access) {
        errors.forum_access = "Seleccione si podrá acceder o no a los foros.";
    }
    if (!values.trivias_in_teams && values.amount != 0) {
        errors.trivias_in_teams = "Ingrese el número máximo de trivias grupales.";
    }
    if (!values.amount && values.amount != 0) {
        errors.amount = "Ingrese el monto.";
    }
    if (!values.trivia_ids) {
        errors.trivia_ids = "Seleccione al menos una trivia.";
    }

    return errors;
};
