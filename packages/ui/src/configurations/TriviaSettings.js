import * as React from 'react'
import {
    FormWithRedirect,
    useEditController,
    useMutation,
    EditContextProvider
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'
import SaveButton from '@approbado/core/components/SaveButton'

const validate = (values) => {
    const errors = {};

    return errors;
};

const TriviaSettingsForm = (props) => (
    <FormWithRedirect
        {...props}
        render={ ({ handleSubmitWithRedirect, saving }) => (
            <Box maxWidth="90em" padding='1em'>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Tiempo límite de trivia</InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>¿Otorgar certificado de finalización?</InputLabel>
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


const TriviaSettings = (props) => {
    const editControllerProps = useEditController(props);
    const [mutate] = useMutation();

    /**
    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: 'trivia-settings',
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])
     **/

    const { record, save } = editControllerProps;

    return (
        <EditContextProvider value={editControllerProps}>
            <TriviaSettingsForm save={save} record={record} validate={validate} />
        </EditContextProvider>
    )
}

TriviaSettings.defaultProps = {
    basePath: '/trivia-settings',
    resource: 'trivia-settings',
    id: 1
}

export default TriviaSettings
