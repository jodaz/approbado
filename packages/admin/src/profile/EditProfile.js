import * as React from 'react'
import {
    TextInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import Grid from '@material-ui/core/Grid'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'

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
    const [provider, { loading }] = useFileProvider(fileProvider);

    const save = React.useCallback(async values => {
        await provider({
            resource: 'profile',
            type: 'create',
            payload: values
        });
    }, [provider]);

    return (
        <BaseForm
            save={save}
            validate={validate}
            disabled={loading}
            saveButtonLabel='Actualizar'
        >
            <Grid container>
                <Grid item sm={'4'}></Grid>
                <Grid item sm={8}>
                    <InputContainer labelName='Nombre' md={8} sm={8} xs={8}>
                        <TextInput
                            label={false}
                            source='names'
                            fullWidth
                        />
                    </InputContainer>
                    <InputContainer labelName='Correo electrónico' md={8} sm={8} xs={8}>
                        <TextInput
                            label={false}
                            source='email'
                            fullWidth
                        />
                    </InputContainer>
                </Grid>
            </Grid>
        </BaseForm>
    )
}

UpdateProfile.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdateProfile
