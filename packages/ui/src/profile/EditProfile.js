import * as React from 'react'
import {
    useDataProvider,
    TextInput,
    FormWithRedirect,
    SaveButton
} from 'react-admin'
import { Grid, InputLabel } from '@material-ui/core'

const validate = values => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese su nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese su correo electrónico.";
    }

    return errors;
};

const UpdateProfileForm = (props) => (
    <FormWithRedirect
        {...props}
        render={ ({ handleSubmitWithRedirect, saving }) => (
            <Grid container spacing={1}>
                <Grid item xs='12' md='4'>

                </Grid>
                <Grid item xs='12' md='8'>
                    <Grid item xs={12}>
                        <InputLabel>Nombre</InputLabel>
                        <TextInput
                            label={false} 
                            source='names' 
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Correo electrónico</InputLabel>
                        <TextInput
                            label={false} 
                            source='email' 
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton
                            handleSubmitWithRedirect={
                                handleSubmitWithRedirect
                            }
                            saving={saving}
                            label='Guardar cambios'
                            icon={<></>}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )}
    />
);

const UpdateProfile = props => {
    const dataProvider = useDataProvider()

    const save = React.useCallback(async (values) => {
        const { data } = await dataProvider.post('update', values);

        console.log(data)
    }, [dataProvider])

    return (
        <UpdateProfileForm save={save} validate={validate} />
    )
}

UpdateProfile.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdateProfile
