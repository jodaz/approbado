import * as React from 'react'
import {
    TextInput,
    useRedirect,
    useNotify,
    SelectInput,
    ReferenceInput,
    SelectArrayInput
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese un nombre para el archivo.";
    }
    if (!values.subtheme_id) {
        errors.subtheme_id = "Seleccione un subtema.";
    }

    return errors;
};

const FileCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await provider({
                resource: 'files',
                type: 'create',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, trivia_id])

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
            <InputContainer labelName='Subtema'>
                <ReferenceInput
                    source='subtheme_id'
                    reference='subthemes'
                    filter={{ trivia_id: trivia_id }}
                    fullWidth
                >
                    <SelectInput optionText="title" />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default FileCreate
