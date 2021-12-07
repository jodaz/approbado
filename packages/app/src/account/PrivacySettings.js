import * as React from 'react'
import {
    useNotify,
    useDataProvider
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'

const PrivacySettings = () => {
    const [record, setRecord] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const dataProvider = useDataProvider()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await dataProvider.post('profile', values);

            notify('Hemos actualizado tus configuraciones de privacidad con éxito.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [dataProvider])

    const fetchProfile = React.useCallback(async () => {
        const { data } = await dataProvider.get('profile');

        setRecord(data)
    }, [dataProvider])

    React.useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <BaseForm
            save={save}
            saveButtonLabel='Actualizar'
            loading={loading}
            record={record}
        >
            <Grid item xs={12}>
                <Checkbox
                    source="profile.show_name"
                    label='Mostrar mi nombre cuando vean mi perfil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.public_profile"
                    label='Permitir que otras personas puedan ver mi perfil como público'
                />
            </Grid>
        </BaseForm>
    )
}

export default PrivacySettings
