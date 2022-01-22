export const validatePlan = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese un nombre para el plan.";
    }

    console.log(values)

    return errors;
};
