import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    useCreateController,
    CreateContextProvider,
    useRedirect,
    useNotify,
    ReferenceInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
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
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: props.resource,
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data && loaded) {
            notify('Has creado una nueva trivia')
            redirect(`/trivias/${data.id}/show`)
        }
    }, [data, loaded])

    return (
        <CreateContextProvider value={createControllerProps}>
            <BaseForm
                save={save}
                validate={validate}
                formName='Crear trivia'
                disabled={loading}
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
                        allowEmpty
                        fullWidth
                    >
                        <SelectInput source="name" emptyText="N/A" />
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
                        allowEmpty
                        fullWidth
                    >
                        <SelectInput source="name" emptyText="N/A" />
                    </ReferenceInput>
                </InputContainer>
            </BaseForm>
        </CreateContextProvider>
    )
}

export default TriviaCreate
