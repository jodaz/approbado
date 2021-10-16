import * as React from 'react'
import {
    useMutation,
    TextInput,
    useEditController,
    EditContextProvider,
    useRedirect
} from 'react-admin'
import { validateLevel } from './configurationsValidations';
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/components/InputContainer'
import { useParams } from 'react-router-dom'

const LevelEdit = (props) => {
    const { id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: id
    });
    const [mutate, { data }] = useMutation();
    const { record } = editControllerProps;
    const redirect = useRedirect()

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
        if (data) {
            return () => redirect('/configurations')
        }
    }, [data, redirect])

    return (
        <EditContextProvider value={editControllerProps}>
            <BaseForm
                save={save}
                validate={validateLevel}
                record={record}
                saveButtonLabel='Actualizar'
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
