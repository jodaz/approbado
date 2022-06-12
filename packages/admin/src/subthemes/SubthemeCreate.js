import * as React from 'react'
import { useNotify } from 'react-admin'
import { useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import { axios } from '@approbado/lib/providers'
import SelectSubthemeInput from './SelectSubthemeInput'
import validate from './subthemeValidations'

const SubthemeCreate = () => {
    const notify = useNotify();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/subthemes', values)

            if (data) {
                history.push(`/trivias/${data.trivia_id}/subthemes/${data.id}/show`)
                notify(`¡Ha creado el subtema "${data.name}"!`, 'success')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear subtema'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Tiempo límite'>
                <TextInput
                    type='number'
                    name="duration"
                    placeholder="Tiempo límite"
                    fullWidth
                />
            </InputContainer>
            <SelectSubthemeInput />
        </BaseForm>
    )
}

export default SubthemeCreate
