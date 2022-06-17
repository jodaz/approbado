import * as React from 'react'
import { useNotify } from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import CustomColorPicker from './CustomColorPicker'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'

const LevelCreate = () => {
    const notify = useNotify();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/configurations/levels', values)

            if (data) {
                history.push(`/configurations/levels`)
                notify(`¡Ha registrado el nivel "${data.name}"!`, 'success')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm save={save} validate={validateLevel} formName='Nuevo nivel'>
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Color'>
                <CustomColorPicker label='' />
            </InputContainer>
        </BaseForm>
    )
}

export default LevelCreate
