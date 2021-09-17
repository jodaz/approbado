import * as React from 'react'
import {
    useDataProvider,
    TextInput,
    FormWithRedirect,
    SaveButton
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'

const validate = values => {
    const errors = {};

    if (!values.curr_password) {
        errors.curr_password = "Ingrese su contraseña actual.";
    }
    if (!values.new_password) {
        errors.new_password = "Ingrese una nueva contraseña.";
    }
    if (!values.new_password_confirm) {
        errors.new_password_confirm = "Ingrese una nueva contraseña.";
    }
    if (values.curr_password === values.new_password) {
        errors.new_password = "La nueva contraseña no debe ser igual a la anterior."
    }
    if (values.new_password !== values.new_password_confirm) {
        errors.new_password_confirm = "Las contraseñas no coinciden.";
    }

    return errors;
};

const UpdatePasswordForm = (props) => (
    <FormWithRedirect
        {...props}
        render={ ({ handleSubmitWithRedirect, saving }) => (
            <Box maxWidth="90em" padding='1em'>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <InputLabel>Contraseña actual</InputLabel>
                        <TextInput
                            label={false} 
                            source='curr_password' 
                            placeholder="Contraseña actual"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Nueva contraseña</InputLabel>
                        <TextInput
                            label={false} 
                            source='new_password' 
                            placeholder="Nueva contraseña"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Confirmación de contraseña</InputLabel>
                        <TextInput
                            label={false} 
                            source='new_password_confirm' 
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton
                            handleSubmitWithRedirect={
                                handleSubmitWithRedirect
                            }
                            saving={saving}
                        />
                    </Grid>
                </Grid>
            </Box>
        )}
    />
);

const UpdatePassword = props => {
    const dataProvider = useDataProvider()

    const save = React.useCallback(async (values) => {
        const { data } = await dataProvider.post('update-password', values);

        console.log(data)
    }, [dataProvider])

    return (
        <UpdatePasswordForm save={save} validate={validate} />
    )
}

UpdatePassword.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdatePassword
