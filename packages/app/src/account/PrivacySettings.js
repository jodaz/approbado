import * as React from 'react'
import {
    useRedirect,
    useDataProvider
} from 'react-admin'
// import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'

const PrivacySettings = () => {
    const [record, setRecord] = React.useState({})
    const dataProvider = useDataProvider();
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        console.log(values)
        const data = await dataProvider.post('profile', values);

        console.log("data", data)
        // try {
        //     await mutate({
        //         type: 'update',
        //         resource: props.resource,
        //         payload: { id: record.id, data: values }
        //     }, { returnPromise: true })
        // } catch (error) {
        //     if (error.response.data.errors) {
        //         return error.response.data.errors;
        //     }
        // }
    }, [])

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
                <Checkbox
                    source="show_name"
                    label='Mostrar mi nombre cuando vean mi perfil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="public_profile"
                    label='Permitir que otras personas puedan ver mi perfil como público'
                />
            </Grid>
        </BaseForm>
    )
}

PrivacySettings.defaultProps = {
    basePath: '/account',
    resource: 'profile'
}

export default PrivacySettings
