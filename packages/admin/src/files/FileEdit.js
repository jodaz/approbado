import * as React from 'react'
import { useNotify } from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import isEmpty from 'is-empty'
import validate from './validateFileForm'
import Spinner from '@approbado/lib/components/Spinner'
import SelectSubthemeInput from './SelectSubthemeInput'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'

const FileEdit = () => {
    const { file_id, trivia_id } = useParams();
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const [record, setRecord] = React.useState({})
    const history = useHistory();
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
            history.push(`/trivias/${trivia_id}/files`)
        }
    }, [fileDataResponse])

    React.useEffect(async () => {
        if (file_id) {
            const { data } = await axios.get(`/files/${file_id}`)

            if (Object.entries(data).length) {
                setRecord(data)
            }
        }
    }, [file_id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validate}
            record={record}
            saveButtonLabel='Actualizar'
            loading={loading}
            formName='Editar archivo'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <SelectSubthemeInput />
            <InputContainer label="" xs={12} md={12}>
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
