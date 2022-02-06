import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    useCreateController,
    CreateContextProvider,
    useRedirect,
    useNotify,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag'
import { Field } from 'react-final-form';

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
    if (!values.plans) {
        errors.plans = "Seleccione al menos un plan.";
    }

    return errors;
};

const TriviaCreate = props => {
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
            notify('Has creado una nueva trivia', 'success')
            redirect(`/trivias/${data.id}/show`)
        }
    }, [data, loaded])

    return (
        <CreateContextProvider value={createControllerProps}>
            <BaseForm
                save={save}
                validate={validate}
                formName='Crear trivia'
                loading={loading}
            >
                <InputContainer labelName='Nombre'>
                    <TextInput
                        source="name"
                        placeholder="Nombre"
                        fullWidth
                    />
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
                <InputContainer labelName='Planes'>
                    <ReferenceArrayInput
                        source='plans'
                        reference='memberships/plans'
                        allowEmpty
                        fullWidth
                    >
                        <SelectArrayInput />
                    </ReferenceArrayInput>
                </InputContainer>
            </BaseForm>
        </CreateContextProvider>
    )
}

export default TriviaCreate
