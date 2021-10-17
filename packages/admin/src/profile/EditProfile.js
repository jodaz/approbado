import * as React from 'react'
import {
    useDataProvider,
    TextInput
} from 'react-admin'
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

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

const UpdateProfile = props => {
    const dataProvider = useDataProvider()

    const save = React.useCallback(async (values) => {
        const { data } = await dataProvider.post('update', values);

        console.log(data)
    }, [dataProvider])

    return (
        <BaseForm
            save={save}
            validate={validate}
            saveButtonLabel='Actualizar'
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    label={false}
                    source='names'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Correo electrónico'>
                <TextInput
                    label={false}
                    source='email'
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

UpdateProfile.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdateProfile
