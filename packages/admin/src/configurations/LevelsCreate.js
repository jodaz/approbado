import * as React from 'react'
import {
    TextInput,
    useMutation,
    useRedirect,
    useNotify,
} from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const LevelCreate = props => {
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
            notify('Se ha completado el registro con éxito', 'success');
            redirect('/configurations?tab=levels')
        }
    }, [data, loaded])

    return (
        <BaseForm save={save} validate={validateLevel} loading={loading} formName='Nuevo nivel'>
            <InputContainer
                labelName='Nombre'
            >
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

LevelCreate.defaultProps = {
    basePath: '/configurations/levels',
    resource: 'configurations/levels'
}

export default LevelCreate
