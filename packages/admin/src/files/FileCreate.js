import * as React from 'react'
import { useNotify } from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import validate from './validateFileForm'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'
import useFetch from '@approbado/lib/hooks/useFetch'

const SelectSubthemeInput = ({ trivia_id }) => {
    const {
        total,
        data
    } = useFetch('/subthemes', {
        filter: { trivia_id: trivia_id }
    })

    if (!total) return null;

    return (
        <InputContainer label='Subtema'>
            <SelectInput
                name='file_id'
                placeholder='Seleccione'
                options={data}
            />
        </InputContainer>
    )
}

const FileCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const history = useHistory()
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
            notify(`¡Ha registrado el archivo "${fileDataResponse.title}" exitosamente!`, 'success')
            history.push(`/trivias/${trivia_id}/files`)
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
            <SelectSubthemeInput trivia_id={trivia_id} />
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
