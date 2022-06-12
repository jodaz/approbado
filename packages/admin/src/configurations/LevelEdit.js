import * as React from 'react'
import { useNotify } from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import CustomColorPicker from './CustomColorPicker'
import TextInput from '@approbado/lib/components/TextInput'
import { useHistory, useParams } from 'react-router-dom'
import { axios } from '@approbado/lib/providers';
import Spinner from '@approbado/lib/components/Spinner'

const LevelEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false)
    const [record, setRecord] = React.useState({})
    const history = useHistory()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`/configurations/levels/${id}`, values);

            setLoading(false)

            if (data) {
                notify(`¡Ha editado el nivel "${data.name}!`, 'success');
                history.push('/configurations?tab=levels')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    React.useEffect(async () => {
        if (id) {
            const { data } = await axios.get(`/configurations/levels/${id}`)

            if (data) {
                setRecord(data)
            }
        }
    }, [id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validateLevel}
            record={record}
            saveButtonLabel='Actualizar'
            loading={loading}
            formName='Editar nivel'
        >
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

export default LevelEdit
