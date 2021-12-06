import * as React from 'react'
import {
    useMutation,
    TextInput,
    useRedirect,
    SelectInput,
    useNotify,
    ReferenceInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const validate = (values) => {
    const errors = {};

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

    return errors;
};

const OPTIONS = [
    { id: '1', name: 'Respuesta correcta' },
    { id: '0', name: 'Respuesta incorrecta' }
]

const QuestionCreate = () => {
    const { subtheme_id } = useParams()
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { subtheme_id: subtheme_id, ...values };

        try {
            await mutate({
                type: 'create',
                resource: 'questions',
                payload: { data: data }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, subtheme_id])

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Has creado una nueva pregunta!')
            redirect(`/trivias/${subtheme_id}/subthemes/${data.id}/show?tab=questions`)
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear pregunta'
            disabled={loading}
        >
            <Box paddingBottom='1rem' width='100%'>
                <Typography variant="subtitle1" color="textSecondary">
                    {'Enunciado'}
                </Typography>
            </Box>
            <InputContainer labelName='Pregunta'>
                <TextInput
                    source="description"
                    placeholder="Ingresa el enunciado"
                    fullWidth
                />
            </InputContainer>
            <Box paddingBottom='1rem' width='100%'>
                <Typography variant="subtitle1" color="textSecondary">
                    {'Aclaratorias'}
                </Typography>
            </Box>
            <InputContainer labelName='Mostrar cuando'>
                <SelectInput
                    source="explanation_type"
                    choices={OPTIONS}
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Aclaratoria'>
                <TextInput
                    source="explanation"
                    placeholder="Ingrese el texto de la aclaratoria"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Archivo de referencia'>
                <ReferenceInput
                    source="file_id"
                    reference="files"
                    fullWidth
                >
                    <SelectInput optionText="title" />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default QuestionCreate
