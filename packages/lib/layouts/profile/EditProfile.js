import * as React from 'react'
import {
    TextInput,
    useNotify
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'

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
    const [record, setRecord] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const notify = useNotify()

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await axios.post('profile', values);

            notify('Hemos actualizado tu perfil con éxito.', 'success')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [axios])

    const fetchProfile = React.useCallback(async () => {
        const { data } = await axios.get('profile');

        setRecord(data)
    }, [axios])

    React.useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <BaseForm
            save={save}
            saveButtonLabel='Actualizar'
            disabled={loading}
            record={record}
            validate={validate}
        >
            <InputContainer labelName='Nombre' md={6} sm={12}>
                <TextInput
                    label={false}
                    source='names'
                    placeholder='Ingresar nombres'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Apellido'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='surnames'
                    placeholder='Ingresar apellidos'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Usuario'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='username'
                    placeholder='Ingrese un nombre de usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Correo electrónico'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='email'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Ocupación'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='profession'
                    placeholder='Ingrese una ocupación'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Teléfono'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='phone'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Linkedin'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='linkedin'
                    placeholder='https://linkedin.com/in/usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Twitter'  md={6} sm={12}>
                <TextInput
                    label={false}
                    source='twitter'
                    placeholder='@usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Biografía' xs={12} sm={12} md={12}>
                <TextInput
                    label={false}
                    source='twitter'
                    fullWidth
                    multiline
                    placeholder='Escribe un poco sobre ti'
                />
            </InputContainer>
        </BaseForm>
    )
}

export default UpdateProfile
