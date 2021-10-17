import * as React from 'react'
import {
    useDataProvider,
    TextInput
} from 'react-admin'
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

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

const UpdatePassword = props => {
    const dataProvider = useDataProvider()

    const save = React.useCallback(async (values) => {
        const { data } = await dataProvider.post('update-password', values);

        console.log(data)
    }, [dataProvider])

    return (
        <BaseForm
            save={save}
            validate={validate}
            saveButtonLabel='Actualizar'
        >
            <InputContainer labelName='Contraseña actual'>
                <TextInput
                    source='curr_password'
                    placeholder="Contraseña actual"
                    fullWidth
            />
        </InputContainer>
            <InputContainer labelName='Contraseña actual'>
                <TextInput
                    source='new_password'
                    placeholder="Nueva contraseña"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Contraseña actual'>
                <TextInput
                    source='new_password_confirm'
                    placeholder="Repita la nueva contraseña"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

UpdatePassword.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdatePassword
