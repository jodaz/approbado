import * as React from 'react'
import {
    useMutation,
    TextInput,
    FormWithRedirect,
    useEditController,
    EditContextProvider,
    SaveButton,
    useRedirect
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'
import { validateLevels } from './configurationsValidations';
import { useParams } from 'react-router-dom'

const LevelEditForm = (props) => (
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


const LevelEdit = (props) => {
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
            <LevelEditForm save={save} record={record} validate={validateLevels} />
        </EditContextProvider>
    )
}

LevelEdit.defaultProps = {
    basePath: '/configurations/levels',
    resource: 'configurations/levels'
}

export default LevelEdit
