import * as React from 'react'
import {
    useMutation,
    TextInput,
    useNotify,
    useRedirect,
    SelectInput,
    ReferenceInput,
    useEditController
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const validate = (values) => {
    const errors = {};

    if (!values.message) {
        errors.message = "Ingrese el nombre.";
    }
    if (!values.trivia_id) {
        errors.trivia_id = "Seleccione una trivia.";
    }

    return errors;
};

const TriviaEdit = props => {
    const editControllerProps = useEditControllerprops;
    const [mutate, { data, loading, loaded }] = useMutation();
    const notify = useNotify();
    const redirect = useRedirect()

    const save = React.useCallback(async values => {
        try {
            await mutate({
                type: 'update',
                resource: 'forums',
                payload: { id: record.id, data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado la actualización con éxito', 'success')
            redirect(`/forums/${record.id}/show`)
        }
    }, [data, loaded])

    const { record } = editControllerProps

    return (
        <BaseForm
            save={save}
            disabled={loading}
            record={record}
            validate={validate}
        >
            <InputContainer labelName='Título' sx={12} md={12}>
                <TextInput
                    source="message"
                    placeholder="Ingrese un título"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Descripción' sx={12} md={12}>
                <TextInput
                    source="summary"
                    placeholder="Ingrese una descripción (Opcional)"
                    fullWidth
                    multiline
                />
            </InputContainer>
            <InputContainer labelName='Trivia' sx={12} md={6}>
                <ReferenceInput
                    source="trivia_id"
                    reference="trivias"
                    fullWidth
                >
                    <SelectInput />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default TriviaEdit
