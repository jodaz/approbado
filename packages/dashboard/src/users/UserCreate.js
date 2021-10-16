import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    FormWithRedirect,
    BooleanInput,
    useCreateController,
    CreateContextProvider,
    SaveButton,
    useRedirect
} from 'react-admin'
import { useFormState } from 'react-final-form'
import { Box, Grid, InputLabel } from '@material-ui/core'

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


const PasswordInput = (props) => {
    const { values } = useFormState();
    
    if (!values.random_pass) {
        return (
            <Grid item xs={12} sm={12} md={6}>
                <InputLabel>Contraseña</InputLabel>
                <TextInput
                    label={false} 
                    source='password' 
                    placeholder="Contraseña"
                    fullWidth
                />
            </Grid>
        )
    }

    return null;
}

const UserCreateForm = (props) => (
    <FormWithRedirect
        {...props}
        render={ ({ handleSubmitWithRedirect, saving }) => (
            <Box maxWidth="90em" padding='1em'>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Nombre</InputLabel>
                        <TextInput 
                            label={false}
                            source="names" 
                            placeholder="Nombre"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Correo electronico</InputLabel>
                        <TextInput
                            label={false} 
                            source="email" 
                            placeholder="Correo electronico"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BooleanInput
                            source="random_pass"
                            label="Generar contraseña y enviar por correo" 
                        />
                    </Grid>
                    <PasswordInput />
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Tipo de acceso</InputLabel>
                        <SelectInput
                            label={false}
                            source="rol" 
                            choices={ACCESS_TYPES}
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

const UserCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate, { data }] = useMutation();
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'users',
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data) {
            return () => redirect('/users')
        }
    }, [data])

    return (
        <CreateContextProvider value={createControllerProps}>
            <UserCreateForm save={save} validate={validate} />
        </CreateContextProvider>
    )
}

export default UserCreate
