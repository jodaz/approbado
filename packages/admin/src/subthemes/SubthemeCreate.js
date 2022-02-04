import * as React from 'react'
import {
    useMutation,
    TextInput,
    useRedirect,
    useNotify,
    ReferenceInput,
    SelectInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
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

const SubthemeCreate = () => {
    const { trivia_id } = useParams()
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await mutate({
                type: 'create',
                resource: 'subthemes',
                payload: { data: data }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, trivia_id])

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Has creado un nuevo subtema!', 'success')
            redirect(`/trivias/${trivia_id}/subthemes/${data.id}/show`)
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear subtema'
            loading={loading}
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
                    filter={{ trivia_id: trivia_id }}
                    fullWidth
                >
                    <SelectInput source="title" emptyText="N/A" optionText="title" />
                </ReferenceInput>
            </InputContainer>
        </BaseForm>
    )
}

export default SubthemeCreate
