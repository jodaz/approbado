import * as React from 'react'
import {
    useRedirect,
    useNotify,
} from 'react-admin'
import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'

const CategoryCreate = () => {
    const [loading, setLoading] = React.useState(false)
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/configurations/categories`, values);

            setLoading(false)

            if (data) {
                notify(`¡Ha registrado la categoría "${data.name}!`, 'success');
                redirect('/configurations?tab=categories')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    return (
        <BaseForm
            save={save}
            validate={validateCategory}
            loading={loading}
            formName='Agregar categoría'
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default CategoryCreate
