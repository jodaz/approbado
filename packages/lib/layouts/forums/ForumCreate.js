import * as React from 'react';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import { FormWithRedirect } from 'react-admin'
import InputContainer from '@approbado/lib/components/InputContainer'
import {
    TextInput,
    useMutation,
    useRedirect,
    useNotify,
    SelectArrayInput,
    ReferenceArrayInput,
    SelectInput
} from 'react-admin'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'

const ForumCreate = () => {
    const status = useDialogState('forums.create');
    const { unsetDialog } = useDialogDispatch('forums.create');
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();
    const { fetchUser } = useUserDispatch();

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
    }, [mutate]);

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado el registro con éxito', 'success');
            redirect(`/forums/${data.id}/show`);
            unsetDialog();
            fetchUser();
        }
    }, [data, loaded])

    return (
        <FormWithRedirect
            save={save}
            disabled={loading}
            render={ ({ handleSubmitWithRedirect }) => (
                <Confirm
                    isOpen={status}
                    loading={loading}
                    title="Crear nuevo debate"
                    content={
                        <Box maxWidth="90em">
                            <Grid container spacing={1}>
                                <InputContainer labelName='Título' md={12}>
                                    <TextInput
                                        source="message"
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
                                <InputContainer labelName='Trivia'  md={12}>
                                    <ReferenceArrayInput
                                        source="trivia_id"
                                        reference="trivias"
                                        fullWidth
                                    >
                                        <SelectInput />
                                    </ReferenceArrayInput>
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
                            </Grid>
                        </Box>
                    }
                    onConfirm={async () => {
                        await handleSubmitWithRedirect();
                    }}
                    onClose={unsetDialog}
                    confirmColor='primary'
                    confirm={'Publicar'}
                />
            )}
        />
    );
}

export default ForumCreate;
