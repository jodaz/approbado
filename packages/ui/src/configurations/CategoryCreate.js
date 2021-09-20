import * as React from 'react'
import {
    TextInput,
    FormWithRedirect,
    useCreateController,
    useMutation,
    CreateContextProvider
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'
import { validateCategory } from './configurationsValidations';
import SaveButton from '@approbado/components/SaveButton'

const CategoryCreateForm = (props) => (
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
                            handleSubmit={handleSubmitWithRedirect}
                            saving={saving}
                        />
                    </Grid>
                </Grid>
            </Box>
        )}
    />
);

const CategoryCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate] = useMutation();
    console.log(props)

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: props.resource,
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
            <CategoryCreateForm save={save} validate={validateCategory} />
        </CreateContextProvider>
    )
}

CategoryCreate.defaultProps = {
    basePath: '/configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryCreate
