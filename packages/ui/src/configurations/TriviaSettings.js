import * as React from 'react'
import {
    useEditController,
    useMutation,
    EditContextProvider,
    NumberInput,
    SelectInput
} from 'react-admin'
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/core/components/InputContainer'
import { validateTriviaSettings as validate } from './configurationsValidations'

const OPTIONS = [
    { id: '0', name: 'Si' },
    { id: '1', name: 'No' }
]

const TriviaSettings = (props) => {
    const editControllerProps = useEditController(props);
    const [mutate] = useMutation();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: props.resource,
                payload: { data: values, id: props.id }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate]);

    const { record } = editControllerProps;

    return (
        <EditContextProvider value={editControllerProps}>
            <BaseForm save={save} record={record} validate={validate}>
                <InputContainer labelName='Tiempo límite de trivia'>
                    <NumberInput
                        source="time_limit"
                        fullWidth
                    />
                </InputContainer>
                <InputContainer labelName='Otorgar certificado de finalización'>
                    <SelectInput
                        source="grant_certification"
                        choices={OPTIONS}
                        defaultValue={0}
                        fullWidth
                    />
                </InputContainer>
            </BaseForm>
        </EditContextProvider>
    )
}

TriviaSettings.defaultProps = {
    basePath: '/trivia-settings',
    resource: 'trivia-settings',
    id: 1
}

export default TriviaSettings
