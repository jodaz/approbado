import * as React from 'react'
import {
    useMutation,
    TextInput,
    useRedirect,
    useNotify,
    NumberInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.points) {
        errors.points = "Ingrese los puntos.";
    }

    return errors;
};

const AwardsCreate = () => {
    const { trivia_id } = useParams()
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await mutate({
                type: 'create',
                resource: 'awards',
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
            notify('¡Has creado un nuevo premio!')
            redirect(`/trivias/${trivia_id}/awards`)
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear premio'
            disabled={loading}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Ingresa los puntos'>
                <NumberInput
                    source="points"
                    placeholder="Ingresa los puntos"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default AwardsCreate
