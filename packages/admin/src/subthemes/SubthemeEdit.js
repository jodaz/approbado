import * as React from 'react'
import {
    useMutation,
    TextInput,
    useNotify,
    useRefresh,
    ReferenceInput,
    SelectInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

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

const SubthemeEdit = ({ record }) => {
    const [mutate, { data, loading, loaded }] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh()

    const save = React.useCallback(async values => {
        try {
            await mutate({
                type: 'update',
                resource: 'subthemes',
                payload: { id: record.id, data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado la actualización con éxito', 'success')
            refresh()
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            loading={loading}
            record={record}
            validate={validate}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Tiempo límite'>
                <TextInput
                    source="duration"
                    placeholder="Tiempo límite"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Premio'>
                <ReferenceInput
                    source='award_id'
                    reference='awards'
                    filter={{ trivia_id: record.trivia_id }}
                    fullWidth
                >
                    <SelectInput  emptyText="N/A" source="name" optionText='title' />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default SubthemeEdit
