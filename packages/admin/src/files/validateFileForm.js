export default function(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese un nombre para el archivo.";
    }
    if (!values.subtheme_id) {
        errors.subtheme_id = "Seleccione un subtema.";
    }
    if (!values.file) {
        errors.file = "Ingrese un archivo.";
    }

    console.log(errors)

    return errors;
}
