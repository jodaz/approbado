export const unmarkOptions = (args, state, utils) => {
    const keys = Object.keys(state.fields).filter(item => item.includes('is_right'))

    keys.forEach(key => utils.changeValue(state, key, () => false))
}

export const validate = (values) => {
    const errors = {};
    const { options } = values

    if (!values.description) {
        errors.description = "Ingrese un enunciado para la pregunta.";
    }
    if (!values.explanation) {
        errors.explanation = "Ingrese el texto de la aclaratoria.";
    }
    if (!values.explanation_type) {
        errors.explanation_type = "Seleccione cuando debe mostrarse la aclaratoria.";
    }
    if (!values.file_id) {
        errors.file_id = "Seleccione un archivo.";
    }
    if (!options.filter(item => item != undefined && item.is_right && item.statement).length) {
        errors.options_field = 'Ingrese al menos una opción correcta.'
    }

    return errors;
};
