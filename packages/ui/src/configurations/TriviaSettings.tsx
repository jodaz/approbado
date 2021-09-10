import * as React from 'react'
import {
    TextInput,
    SelectInput,
    EditProps,
    FormWithRedirect,
    SaveButton,
    useEditController,
    useMutation,
    EditContextProvider
} from 'react-admin'
import { Box, Grid, InputLabel } from '@material-ui/core'

interface FormValues {
    grant_certification?: number;
    time_limit?: number;
}

const validate = (values: FormValues) => {
    const errors: FormValues = {};
  
    return errors;
};

const TriviaSettingsForm = (props: any) => (
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


const TriviaSettings = (props: EditProps) => {
    const editControllerProps = useEditController(props);
    const [mutate] = useMutation();

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

    return (
        <EditContextProvider value={editControllerProps}>
            <TriviaSettingsForm save={save} validate={validate} />
        </EditContextProvider>
    )
}

TriviaSettings.defaultProps = {
    basePath: '/categories',
    resource: 'categories'
}

export default TriviaSettings
