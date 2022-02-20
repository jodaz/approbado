export default function(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese el nombre.";
    }
    if (!values.min_points) {
        errors.min_points = "Ingrese los puntos.";
    }

    return errors;
}
