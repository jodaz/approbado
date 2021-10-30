import * as React from 'react'
import {
    useNotify,
    useDataProvider
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'

const NotificationSettings = () => {
    const [record, setRecord] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const dataProvider = useDataProvider()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await dataProvider.post('profile', values);

            notify('Hemos actualizado tus configuraciones de notificaciones con éxito.')
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
            disabled={loading}
            record={record}
        >
            <Grid item xs={12}>
                <Checkbox
                    source="general_notifications"
                    label='Recibir notificaciones generales'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="notify_mobile_app"
                    label='Recibir notificaciones sobre comentarios en aplicativo móvil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="notify_email"
                    label='Recibir notificaciones sobre comentarios en el correo electrónico vinculado'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="notify_about_chat"
                    label='Recibir notificaciones sobre mensajería'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="notify_about_account"
                    label='Recibir notificaciones sobre actualizaciones a la cuenta'
                />
            </Grid>
        </BaseForm>
    )
}

export default NotificationSettings
