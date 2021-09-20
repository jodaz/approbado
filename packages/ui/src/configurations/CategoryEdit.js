import * as React from 'react'
import {
    useMutation,
    TextInput,
    FormWithRedirect,
    useEditController,
    EditContextProvider,
    useRedirect
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'
import { validateCategory } from './configurationsValidations';
import { useParams } from 'react-router-dom'
import SaveButton from '@approbado/components/SaveButton'

const CategoryEditForm = (props) => (
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
                            label='Actualizar'
                        />
                    </Grid>
                </Grid>
            </Box>
        )}
    />
);


const CategoryEdit = (props) => {
    const { id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: id
    });
    const [mutate, { data }] = useMutation();
    const { record } = editControllerProps;
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: props.resource,
                payload: { id: record.id, data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data) {
            return () => redirect('/configurations')
        }
    }, [data, redirect])

    return (
        <EditContextProvider value={editControllerProps}>
            <CategoryEditForm save={save} record={record} validate={validateCategory} />
        </EditContextProvider>
    )
}

CategoryEdit.defaultProps = {
    basePath: '/configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryEdit
