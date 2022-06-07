import * as React from 'react'
import {
    useRedirect,
    useNotify,
} from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import CustomColorPicker from './CustomColorPicker'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'

const LevelCreate = () => {
    const [loading, setLoading] = React.useState(false)
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/configurations/levels`, values);

            setLoading(false)

            if (data) {
                notify(`¡Ha registrado el nivel "${data.name}"!`, 'success');
                redirect('/configurations?tab=levels')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    return (
        <BaseForm save={save} validate={validateLevel} loading={loading} formName='Nuevo nivel'>
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Color'>
                <CustomColorPicker />
            </InputContainer>
        </BaseForm>
    )
}

export default LevelCreate
