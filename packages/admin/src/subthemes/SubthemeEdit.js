import * as React from 'react'
import {
    useMutation,
    useNotify,
    useRefresh,
    ReferenceInput,
    SelectInput,
    NumberInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'

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
    const [mutate, { loading, loaded }] = useMutation();
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
        if (loaded) {
            notify('Se ha completado la actualización con éxito', 'success')
            refresh()
        }
    }, [loaded])

    return (
        <BaseForm
            save={save}
            loading={loading}
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
                <NumberInput
                    source="duration"
                    placeholder="Tiempo límite"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Premio'>
                <ReferenceInput
                    source='award_id'
                    reference='awards'
                    filter={{ trivia_id: record.trivia_id }}
                    fullWidth
                    allowEmpty
                >
                    <SelectInput  emptyText="N/A" source="name" optionText='title' />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default SubthemeEdit
