import * as React from 'react'
import {
    useMutation,
    TextInput,
    useEditController,
    EditContextProvider,
    useRedirect,
    useNotify
} from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useParams } from 'react-router-dom'

const LevelEdit = (props) => {
    const { id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: id
    });
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: props.resource,
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
            notify('Se ha completado la actualización con éxito')
            redirect('/configurations?tab=levels')
        }
    }, [data, loaded])

    const { record } = editControllerProps

    return (
        <EditContextProvider value={editControllerProps}>
            <BaseForm
                save={save}
                validate={validateLevel}
                record={record}
                saveButtonLabel='Actualizar'
                disabled={loading}
            >
                <InputContainer labelName='Nombre'>
                    <TextInput
                        source="name"
                        placeholder="Nombre"
                        fullWidth
                    />
                </InputContainer>
            </BaseForm>
        </EditContextProvider>
    )
}

LevelEdit.defaultProps = {
    basePath: '/configurations/levels',
    resource: 'configurations/levels'
}

export default LevelEdit
