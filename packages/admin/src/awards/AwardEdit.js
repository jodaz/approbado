import * as React from 'react'
import {
    TextInput,
    useRedirect,
    useNotify,
    NumberInput,
    SelectInput,
    useEditController
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import validate from './validateAwardForm'
import Spinner from '@approbado/lib/components/Spinner'
import { FileInput, ACCESS_TYPES } from './awardsFormHelpers'

const AwardsEdit = props => {
    const { award_id, trivia_id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: award_id
    });
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { id: award_id, ...values };

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
    }, [provider, trivia_id])

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            notify('Se ha completado la actualización con éxito', 'success')
            redirect('/configurations?tab=levels')
        }
    }, [fileDataResponse])

    const { record, loading: isRecordFetched } = editControllerProps

    if (isRecordFetched) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Editar premio'
            record={record}
            loading={loading}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="title"
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

AwardsEdit.defaultProps = {
    basePath: '/awards',
    resource: 'awards'
}

export default AwardsEdit
