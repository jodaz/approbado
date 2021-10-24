import * as React from 'react'
import {
    useRedirect,
    useDataProvider
} from 'react-admin'
// import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import { Field } from 'react-final-form';
import Checkbox from '@approbado/lib/components/Checkbox'
import Grid from '@material-ui/core/Grid'

const PrivacySettings = () => {
    const [record, setRecord] = React.useState({})
    const dataProvider = useDataProvider();
    const redirect = useRedirect()

    // const save = React.useCallback(async (values) => {
    //     try {
    //         await mutate({
    //             type: 'update',
    //             resource: props.resource,
    //             payload: { id: record.id, data: values }
    //         }, { returnPromise: true })
    //     } catch (error) {
    //         if (error.response.data.errors) {
    //             return error.response.data.errors;
    //         }
    //     }
    // }, [mutate])

    const save = () => ({});

    const fetchProfile = React.useCallback(async () => {
        const { data } = await dataProvider.get('profile');

        setRecord(data[0])
    }, [dataProvider])

    React.useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <BaseForm
            save={save}
            record={record}
            saveButtonLabel='Guardar cambios'
        >
            <Grid item xs={12}>
                <Field
                    name="display_name"
                    type="checkbox"
                    value="display_name"
                    component={Checkbox}
                >
                    <label>
                        Mostrar mi nombre cuando vean mi perfil
                    </label>
                </Field>
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="public_profile"
                    type="checkbox"
                    value="public_profile"
                    component={Checkbox}
                >
                    <label>
                        Permitir que otras personas puedan ver mi perfil como público
                    </label>
                </Field>
            </Grid>
        </BaseForm>
    )
}

PrivacySettings.defaultProps = {
    basePath: '/account',
    resource: 'profile'
}

export default PrivacySettings
