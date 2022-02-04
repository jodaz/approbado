import * as React from 'react'
import {
    useMutation,
    TextInput,
    useNotify,
    useRefresh
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese el nombre.";
    }
    if (!values.duration) {
        errors.duration = "Ingrese un tiempo límite.";
    }

    return errors;
};

const TriviaEdit = ({ record }) => {
    const [mutate, { data, loading, loaded }] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh()

    const save = React.useCallback(async values => {
        try {
            await mutate({
                type: 'update',
                resource: 'subthemes',
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
            refresh()
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            disabled={loading}
            record={record}
            validate={validate}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Tiempo límite'>
                <TextInput
                    source="duration"
                    placeholder="Tiempo límite"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default TriviaEdit
