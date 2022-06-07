import * as React from 'react'
import {
    SelectInput,
    useNotify
} from 'react-admin'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import CustomSelectInput from '@approbado/lib/components/SelectInput'

const ACCESS_TYPES = [
    { id: '1', name: 'Gratis' },
    { id: '0', name: 'De pago' }
]

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }

    return errors;
};

const TriviaCreate = () => {
    const notify = useNotify();
    const history = useHistory()
    const [categories, setCategories] = React.useState([])

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/trivias', values)

            if (data) {
                history.push(`/trivias/${data.id}/show`)
                notify(`¡Ha registrado la trivia "${data.name}"!`, 'success')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    const fetchCategories = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/configurations/categories')

        setCategories(data)
    }, [])

    React.useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear trivia'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Acceso'>
                <SelectInput
                    source="is_free"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Categoría'>
                <CustomSelectInput
                    name='category_id'
                    placeholder='Categoría'
                    options={categories}
                />
            </InputContainer>
        </BaseForm>
    )
}

TriviaCreate.defaultProps = {
    basePath: 'trivias',
    resource: 'trivias'
}

export default TriviaCreate
