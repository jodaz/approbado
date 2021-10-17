import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    useCreateController,
    CreateContextProvider,
    useRedirect,
    ReferenceInput
} from 'react-admin'
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const ACCESS_TYPES = [
    { id: '0', name: 'Gratis' },
    { id: '1', name: 'De pago' }
]

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.level_id) {
        errors.level_id = "Seleccione un nivel.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }

    return errors;
};

const TriviaCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate, { data }] = useMutation();
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'trivias',
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data) {
            return () => redirect('/trivias')
        }
    }, [data])

    return (
        <CreateContextProvider value={createControllerProps}>
            <BaseForm
                save={save}
                validate={validate}
                formName='Crear trivia'
            >
                <InputContainer labelName='Nombre'>
                    <TextInput
                        source="name"
                        placeholder="Nombre"
                        fullWidth
                    />
                </InputContainer>
                <InputContainer labelName='Nivel'>
                    <ReferenceInput
                        source='level_id'
                        reference='configurations/levels'
                        fullWidth
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                </InputContainer>
                <InputContainer labelName='Acceso'>
                    <SelectInput
                        source="is_free"
                        choices={ACCESS_TYPES}
                        fullWidth
                    />
                </InputContainer>
                <InputContainer labelName='Categoría'>
                    <ReferenceInput
                        source='category_id'
                        reference='configurations/categories'
                        fullWidth
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                </InputContainer>
            </BaseForm>
        </CreateContextProvider>
    )
}

export default TriviaCreate
