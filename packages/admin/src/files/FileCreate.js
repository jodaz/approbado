import * as React from 'react'
import {
    TextInput,
    useRedirect,
    useNotify
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
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

const FileCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data, loading, loaded }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await provider({
                type: 'create',
                resource: 'files',
                payload: { data: data }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, trivia_id])

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Has creado un nuevo archivo!')
            redirect(`/trivias/${trivia_id}/files`)
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear archivo'
            disabled={loading}
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

export default FileCreate
