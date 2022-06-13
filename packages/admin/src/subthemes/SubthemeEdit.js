import * as React from 'react'
import { useNotify } from 'react-admin'
import { useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import { axios } from '@approbado/lib/providers'
import validate from './subthemeValidations'
import SelectAwardInput from './SelectAwardInput'

const SubthemeEdit = ({ record }) => {
    const notify = useNotify();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.put(`subthemes/${record.id}`, values)

            if (data) {
                history.push(`/trivias/${record.trivia_id}/subthemes/${data.id}`)
                notify(`¡Ha actualizado el subtema "${data.name}"!`, 'success')
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
            record={record}
            validate={validate}
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
            <SelectAwardInput />
        </BaseForm>
    )
}

export default SubthemeEdit
