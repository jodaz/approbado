import * as React from 'react'
import {
    useRedirect,
    useNotify,
    SelectInput,
    ReferenceInput
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import validate from './validateFileForm'
import TextInput from '@approbado/lib/components/TextInput'

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

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            console.log(fileDataResponse)
            notify(`¡Ha registrado el archivo "${fileDataResponse.title}" exitosamente!`, 'success')
            redirect(`/trivias/${trivia_id}/show?tab=files`)
        }
    }, [fileDataResponse])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear archivo'
            loading={loading}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Subtema'>
                <ReferenceInput
                    source='subtheme_id'
                    reference='subthemes'
                    filter={{ trivia_id: trivia_id }}
                    allowEmpty
                    fullWidth
                >
                    <SelectInput source="title" emptyText="N/A" optionText="name" />
                </ReferenceInput>
            </InputContainer>
            <InputContainer label="" xs={12} md={12}>
                <UploadFileButton
                    name="file"
                    accept='application/pdf'
                />
            </InputContainer>
        </BaseForm>
    )
}

export default FileCreate
