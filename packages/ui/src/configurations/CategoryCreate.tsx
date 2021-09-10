import * as React from 'react'
import {
    TextInput,
    CreateProps,
    FormWithRedirect,
    SaveButton,
    useCreateController,
    useMutation,
    CreateContextProvider
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'

interface FormValues {
    name?: string;
}

const validate = (values: FormValues) => {
    const errors: FormValues = {};
  
    if (!values.name) {
      errors.name = "Ingrese un nombre para la nueva categoría.";
    }
  
    return errors;
};

const CategoryCreateForm = (props: any) => (
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


const CategoryCreate = (props: CreateProps) => {
    const createControllerProps = useCreateController(props);
    const [mutate] = useMutation();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'categories',
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    return (
        <CreateContextProvider value={createControllerProps}>
            <CategoryCreateForm save={save} validate={validate} />
        </CreateContextProvider>
    )
}

CategoryCreate.defaultProps = {
    basePath: '/categories',
    resource: 'categories'
}

export default CategoryCreate
