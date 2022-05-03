import * as React from 'react'
import {
    useRedirect,
    useNotify,
    NumberInput,
    SelectInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useFileProvider } from '@jodaz_/file-provider'
import { fileProvider } from '@approbado/lib/providers'
import isEmpty from 'is-empty'
import validate from './validateAwardForm'
import { FileInput, ACCESS_TYPES } from './awardsFormHelpers'
import TextInput from '@approbado/lib/components/TextInput'

const AwardsCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data, loading }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await provider({
                resource: 'awards',
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
        if (!isEmpty(data)) {
            notify(`¡Ha registrado el premio "${data.title}" exitosamente!`, 'success')
            redirect(`/trivias/${trivia_id}/show?tab=awards`)
        }
    }, [data])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear premio'
            loading={loading}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Ingresa los puntos'>
                <NumberInput
                    source="min_points"
                    placeholder="Ingresa los puntos"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Tipo de premio'>
                <SelectInput
                    source="type"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <FileInput />
        </BaseForm>
    )
}

export default AwardsCreate
