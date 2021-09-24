import * as React from 'react'
import {
    TextInput,
    useCreateController,
    useMutation,
    CreateContextProvider
} from 'react-admin'
import { validateCategory } from './configurationsValidations';
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/core/components/InputContainer'

const CategoryCreate = (props) => {
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
            <BaseForm save={save} validate={validateCategory} formName='Nueva categoría'>
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

CategoryCreate.defaultProps = {
    basePath: '/configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryCreate
