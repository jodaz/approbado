import * as React from 'react'
import { useNotify } from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import validate from './validateAwardForm'
import Spinner from '@approbado/lib/components/Spinner'
import { FileInput, ACCESS_TYPES } from './awardsFormHelpers'
import { useHistory, useParams } from 'react-router-dom'
import { axios } from '@approbado/lib/providers'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'

const AwardsEdit = () => {
    const { award_id, trivia_id } = useParams();
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const [record, setRecord] = React.useState({})
    const history = useHistory();
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { id: award_id, data: values };
        try {
            await provider({
                resource: 'awards',
                type: 'update',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider])

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            notify(`¡Ha actualizado el premio "${fileDataResponse.title}" exitosamente!`, 'success')
            history.push(`/trivias/${trivia_id}/awards`)
        }
    }, [fileDataResponse])

    React.useEffect(async () => {
        if (award_id) {
            const { data } = await axios.get(`/awards/${award_id}`)

            if (Object.entries(data).length) {
                setRecord(data)
            }
        }
    }, [award_id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Editar premio'
            record={record}
            loading={loading}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Ingresa los puntos'>
                <TextInput
                    type='number'
                    name="min_points"
                    placeholder="Ingresa los puntos"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Tipo de premio'>
                <SelectInput
                    name="type"
                    options={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <FileInput />
        </BaseForm>
    )
}

export default AwardsEdit
