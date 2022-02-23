import * as React from 'react'
import {
    TextInput,
    useRedirect,
    useNotify,
    SelectInput,
    ReferenceInput,
    useEditController
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import isEmpty from 'is-empty'
import validate from './validateFileForm'
import Spinner from '@approbado/lib/components/Spinner'

const FileEdit = props => {
    const { file_id, trivia_id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: file_id
    });
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { id: file_id, data: values };

        try {
            await provider({
                resource: 'files',
                type: 'update',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, file_id])

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            notify(`¡Ha actualizado el archivo "${fileDataResponse.title}" exitosamente!`, 'success')
            redirect(`/trivias/${trivia_id}/show?tab=files`)
        }
    }, [fileDataResponse])

    const { record, loading: isRecordFetched } = editControllerProps

    if (isRecordFetched) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validate}
            record={record}
            saveButtonLabel='Actualizar'
            loading={loading}
            formName='Editar archivo'
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
                    allowEmpty
                    fullWidth
                >
                    <SelectInput source="title" emptyText="N/A" optionText="name" />
                </ReferenceInput>
            </InputContainer>
            <InputContainer labelName="" xs={12} md={12}>
                <UploadFileButton
                    name="file"
                    source='file'
                    accept='application/pdf'
                />
            </InputContainer>
        </BaseForm>
    )
}

FileEdit.defaultProps = {
    basePath: '/files',
    resource: 'files'
}

export default FileEdit
