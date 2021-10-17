import * as React from 'react'
import {
    TextInput,
    useCreateController,
    useMutation,
    CreateContextProvider
} from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const LevelCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate] = useMutation();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: props.resource,
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    return (
        <CreateContextProvider value={createControllerProps}>
            <BaseForm save={save} validate={validateLevel} formName='Nuevo nivel'>
                <InputContainer
                    labelName='Nombre'
                >
                    <TextInput
                        source="name"
                        placeholder="Nombre"
                        fullWidth
                    />
                </InputContainer>
            </BaseForm>
        </CreateContextProvider>
    )
}

LevelCreate.defaultProps = {
    basePath: '/configurations/levels',
    resource: 'configurations/levels'
}

export default LevelCreate
