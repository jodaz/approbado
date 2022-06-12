import * as React from 'react';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import { Form } from 'react-final-form'
import InputContainer from '@approbado/lib/components/InputContainer'
import {
    useMutation,
    useNotify,
    ReferenceArrayInput,
    SelectInput
} from 'react-admin'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag';
import TextInput from '@approbado/lib/components/TextInput'

import { useHistory } from 'react-router-dom'
const ForumCreate = () => {
    const status = useDialogState('forums.create');
    const { unsetDialog } = useDialogDispatch('forums.create');
    const [mutate, { data, loading, loaded }] = useMutation();
    const history = useHistory()
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
        if (loaded) {
            notify('Se ha completado el registro con éxito', 'success');
            history.push(`/forums/${data.id}/show`);
            unsetDialog();
            fetchUser();
        }
    }, [loaded])

    return (
        <Form
            onSubmit={save}
            disabled={loading}
            render={ ({ handleSubmit }) => (
                <Confirm
                    isOpen={status}
                    loading={loading}
                    title="Crear nuevo debate"
                    content={
                        <Box maxWidth="90em">
                            <Grid container spacing={1}>
                                <InputContainer label='Título' md={12}>
                                    <TextInput
                                        name="message"
                                        placeholder="Ingrese un título"
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer label='Descripción' md={12}>
                                    <TextInput
                                        name="summary"
                                        placeholder="Ingrese una descripción (Opcional)"
                                        fullWidth
                                        multiline
                                    />
                                </InputContainer>
                                <InputContainer label='Trivia'  md={12}>
                                    <ReferenceArrayInput
                                        source="trivia_id"
                                        reference="trivias"
                                        fullWidth
                                    >
                                        <SelectInput />
                                    </ReferenceArrayInput>
                                </InputContainer>
                                <InputContainer label='Etiquetas'  md={12}>
                                    <ReferenceArrayInput
                                        source="categories_ids"
                                        reference="configurations/categories"
                                        fullWidth
                                    >
                                        <MultipleSelectTag />
                                    </ReferenceArrayInput>
                                </InputContainer>
                            </Grid>
                        </Box>
                    }
                    onConfirm={async () => {
                        await handleSubmit();
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
