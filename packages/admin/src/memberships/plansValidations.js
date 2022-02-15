export const validatePlan = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para el plan.";
    }
    if (!values.duration) {
        errors.duration = "Ingrese la duración de la membresía.";
    }
    if (!values.forum_access) {
        errors.forum_access = "Seleccione si podrá acceder o no a los foros.";
    }
    if (!values.trivias_in_teams) {
        errors.trivias_in_teams = "Seleccione si podrá acceder o no a los foros.";
    }
    if (!values.amount) {
        errors.amount = "Ingrese el monto.";
    }
    if (!values.trivia_ids) {
        errors.trivia_ids = "Seleccione al menos una trivia.";
    }

    console.log(values)

    return errors;
};
