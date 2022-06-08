import * as React from 'react'
import SelectInput from '@approbado/lib/components/SelectInput'
import { useNotify } from 'react-admin'
import { useParams, useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import { axios } from '@approbado/lib/providers'

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.duration) {
        errors.duration = "Ingrese un tiempo límite.";
    }
    if (!values.award_id) {
        errors.award_id = "Seleccione un premio.";
    }

    return errors;
};

const SubthemeCreate = () => {
    const { trivia_id } = useParams()
    const notify = useNotify();
    const [awards, setAwards] = React.useState([])
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/subthemes', values)

            if (data) {
                history.push(`/trivias/${trivia_id}/subthemes/${data.id}/show`)
                notify(`¡Ha creado el subtema "${data.name}"!`, 'success')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    const fetchAwards = React.useCallback(async () => {
        const { data: { data }} =
            await axios.get(`awards?filter%5Btrivia_id%5D=${trivia_id}`)

        setAwards(data)
    }, [])

    React.useEffect(() => {
        fetchAwards();
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
            <InputContainer label='Premio'>
                <SelectInput
                    name='award_id'
                    placeholder='Premio'
                    options={awards}
                    property='title'
                />
            </InputContainer>
        </BaseForm>
    )
}

export default SubthemeCreate
