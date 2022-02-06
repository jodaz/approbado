import * as React from 'react'
import {
    TextInput,
    useMutation,
    useRedirect,
    useNotify,
} from 'react-admin'
import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const CategoryCreate = props => {
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

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

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado el registro con éxito', 'success');
            redirect('/configurations?tab=categories')
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validateCategory}
            loading={loading}
            formName='Agregar categoría'
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

CategoryCreate.defaultProps = {
    basePath: '/configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryCreate
