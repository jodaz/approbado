import * as React from 'react'
import { useNotify } from 'react-admin'
import InputContainer from '@approbado/lib/components/InputContainer'
import Grid from '@material-ui/core/Grid'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import ProfilePhotoInput from '@approbado/lib/components/ProfilePhotoInput'
import Box from '@material-ui/core/Box'
import Button from '@approbado/lib/components/Button'
import isEmpty from 'is-empty'
import { useUserDispatch, useUserState } from '@approbado/lib/hooks/useUserState'
import TextInput from '@approbado/lib/components/TextInput'
import { Form } from 'react-final-form'

const validate = values => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese su nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese su correo electrónico.";
    }

    return errors;
}

const UpdateProfile = () => {
    const [provider, { loading, data }] = useFileProvider(fileProvider);
    const { user } = useUserState();
    const notify = useNotify();
    const { fetchUser } = useUserDispatch();

    const save = React.useCallback(async values => {
        await provider({
            resource: 'profile',
            type: 'create',
            payload: values
        });
    }, [provider]);

    React.useEffect(() => {
        if (!isEmpty(data)) {
            notify('¡Su perfil ha sido actualizado!', 'success')
            fetchUser();
        }
    }, [data])

    return (
        <Box paddingTop='2rem'>
            <Form
                initialValues={user}
                save={save}
                disabled={loading}
                validate={validate}
                onSubmit={save}
                render={ ({ handleSubmit }) => (
                    <Grid container spacing='5'>
                        <Grid item md='3' xs='12'>
                            <Box width='100%' display='flex' justifyContent="center">
                                <ProfilePhotoInput
                                    source='file'
                                    preview={user.picture}
                                    disabled={loading}
                                    accept='image/jpeg, image/png'
                                />
                            </Box>
                        </Grid>
                        <Grid item md='9' xs='12'>
                            <InputContainer label='Nombre' md={8} sm={8} xs={12}>
                                <TextInput
                                    name='names'
                                    disabled={loading}
                                    fullWidth
                                />
                            </InputContainer>
                            <InputContainer label='Correo electrónico' md={8} sm={8} xs={12}>
                                <TextInput
                                    name='email'
                                    disabled={loading}
                                    fullWidth
                                />
                            </InputContainer>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <Button
                                    disabled={loading}
                                    onClick={event => {
                                        if (event) {
                                            event.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    unresponsive
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            />
        </Box>
    )
}

UpdateProfile.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdateProfile
