import * as React from 'react'
import { useNotify } from 'react-admin'
import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'

const CategoryCreate = () => {
    const notify = useNotify();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/configurations/categories', values)

            if (data) {
                history.push(`/configurations/categories`)
                notify(`¡Ha registrado la categoría "${data.name}"!`, 'success')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm
            save={save}
            validate={validateCategory}
            formName='Agregar categoría'
        >
            <InputContainer label='Nombre'>
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
