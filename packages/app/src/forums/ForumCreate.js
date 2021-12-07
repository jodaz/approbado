import * as React from 'react';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import {
    TextInput,
    useMutation,
    useRedirect,
    useNotify,
    SelectArrayInput,
    ReferenceArrayInput
} from 'react-admin'

const ForumCreate = () => {
    const status = useDialogState('forums.create');
    const { unsetDialog } = useDialogDispatch('forums.create');
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'forums',
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
            notify('Se ha completado el registro con éxito')
            redirect(`/forums/${data.id}`)
        }
    }, [data, loaded])

    return (
        <Confirm
            isOpen={status}
            loading={loading}
            title="Crear nuevo debate"
            content={
                <BaseForm
                    save={save}
                    disabled={loading}
                    noButton
                >
                    <InputContainer labelName='Título' md={12}>
                        <TextInput
                            source="title"
                            placeholder="Ingrese un título"
                            fullWidth
                        />
                    </InputContainer>
                    <InputContainer labelName='Descripción' md={12}>
                        <TextInput
                            source="summary"
                            placeholder="Ingrese una descripción (Opcional)"
                            fullWidth
                            multiline
                        />
                    </InputContainer>
                    <InputContainer labelName='Etiquetas'  md={12}>
                        <ReferenceArrayInput
                            source="categories_ids"
                            reference="configurations/categories"
                            fullWidth
                        >
                            <SelectArrayInput />
                        </ReferenceArrayInput>
                    </InputContainer>
                </BaseForm>
            }
            onConfirm={async () => {
                await save();
                await unsetDialog();
            }}
            onClose={unsetDialog}
            confirmColor='primary'
            confirm={'Publicar'}
        />
    );
}

export default ForumCreate;
