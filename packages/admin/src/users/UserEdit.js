import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    BooleanInput,
    useEditController,
    EditContextProvider,
    useRedirect,
    useNotify,
    PasswordInput as RaPasswordInput
} from 'react-admin'
import { useFormState } from 'react-final-form'
import { Grid } from '@material-ui/core'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const ACCESS_TYPES = [
    { id: 'Administrador', name: 'Administrador' },
    { id: 'Pagos', name: 'Pagos' },
    { id: 'Moderador', name: 'Moderador' }
]

const validate = (values) => {
  const errors = {};

  if (!values.names) {
    errors.name = "Ingrese el nombre.";
  }
  if (!values.email) {
    errors.email = "Ingrese un correo electronico.";
  }
  if (!values.random_pass && !values.password) {
    errors.password = "Ingrese una contraseña.";
  }

  return errors;
};

const PasswordInput = props => {
    const { values } = useFormState();

    if (!values.random_pass) {
        return (
            <InputContainer labelName='Nombre'>
                <RaPasswordInput
                    label={false}
                    source='password'
                    placeholder="Contraseña"
                    fullWidth
                />
            </InputContainer>
        )
    }

    return null;
}

const UserEdit = props => {
    const editControllerProps = useEditController(props);
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: 'users',
                payload: { id: record.id, data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado la actualización con éxito', 'success')
            redirect('/users?tab=admins')
        }
    }, [data, loaded])

    const { record } = editControllerProps

    return (
        <EditContextProvider value={editControllerProps}>
            <BaseForm save={save} validate={validate} disabled={loading} record={record}>
                <InputContainer
                    labelName='Nombres'
                >
                    <TextInput
                        source="names"
                        placeholder="Nombres"
                        fullWidth
                    />
                </InputContainer>
                <InputContainer labelName='Correo electrónico'>
                    <TextInput
                        label={false}
                        source="email"
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
                <PasswordInput />
                <InputContainer labelName='Tipo de acceso'>
                    <SelectInput
                        label={false}
                        source="rol"
                        choices={ACCESS_TYPES}
                        fullWidth
                    />
                </InputContainer>
            </BaseForm>
        </EditContextProvider>
    )
}

export default UserEdit
