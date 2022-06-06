import * as React from 'react'
import {
    SelectInput,
    BooleanInput,
    useNotify
} from 'react-admin'
import { Grid } from '@material-ui/core'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'
import CustomPasswordInput from './CustomPasswordInput'

const ACCESS_TYPES = [
    { id: 'Administrador', name: 'Administrador' },
    { id: 'Pagos', name: 'Pagos' },
    { id: 'Moderador', name: 'Moderador' }
]

const validate = (values) => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese el nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese un correo electronico.";
    }
    if (!values.random_pass && !values.password) {
        errors.password = "Ingrese una contraseña.";
    }

    return errors;
};

const UserCreate = () => {
    const notify = useNotify();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/users', values)

            if (data) {
                history.push('/users?tab=admins')
                notify('Se ha completado el registro con éxito', 'success');
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Agregar nuevo usuario'
        >
            <InputContainer
                labelName='Nombres'
            >
                <TextInput
                    name="names"
                    placeholder="Nombres"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Correo electrónico'>
                <TextInput
                    label={false}
                    name="email"
                    placeholder="Correo electronico"
                    fullWidth
                />
            </InputContainer>
            <Grid item xs={12}>
                <BooleanInput
                    source="random_pass"
                    label="Generar contraseña y enviar por correo"
                />
            </Grid>
            <CustomPasswordInput />
            <InputContainer labelName='Tipo de acceso'>
                <SelectInput
                    label={false}
                    source="rol"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default UserCreate
