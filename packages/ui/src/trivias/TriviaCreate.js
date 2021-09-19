import * as React from 'react'
import {
    useMutation,
    TextInput,
    SelectInput,
    FormWithRedirect,
    useCreateController,
    CreateContextProvider,
    SaveButton,
    useRedirect,
    ReferenceInput
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'

const ACCESS_TYPES = [
    { id: '0', name: 'Gratis' },
    { id: '1', name: 'De pago' }
]

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.level_id) {
        errors.level_id = "Seleccione un nivel.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }

    return errors;
};

const TriviaCreateForm = (props) => (
    <FormWithRedirect
        {...props}
        render={ ({ handleSubmitWithRedirect, saving }) => (
            <Box maxWidth="90em" padding='1em'>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Nombre</InputLabel>
                        <TextInput 
                            label={false}
                            source="name" 
                            placeholder="Nombre"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Nivel</InputLabel>
                        <ReferenceInput
                            source='level_id'
                            reference='configurations/levels'
                            label=''
                            fullWidth
                        >
                            <SelectInput source="name" />
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Acceso</InputLabel>
                        <SelectInput
                            label={false}
                            source="is_free" 
                            choices={ACCESS_TYPES}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Categoría</InputLabel>
                        <ReferenceInput
                            source='category_id'
                            reference='configurations/categories'
                            label=''
                            fullWidth
                        >
                            <SelectInput source="name" />
                        </ReferenceInput>
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

const TriviaCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate, { data }] = useMutation();
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'trivias',
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
            return () => redirect('/trivias')
        }
    }, [data])

    return (
        <CreateContextProvider value={createControllerProps}>
            <TriviaCreateForm save={save} validate={validate} />
        </CreateContextProvider>
    )
}

export default TriviaCreate
