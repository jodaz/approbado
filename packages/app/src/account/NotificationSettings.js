import * as React from 'react'
import {
    useNotify
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'
import { axios } from '@approbado/lib/providers'
import useFetchProfile from '@approbado/lib/hooks/useFetchProfile'
import Spinner from '@approbado/lib/components/Spinner'

const NotificationSettings = () => {
    const [{ record, isLoading, isError }, doFetch] = useFetchProfile();
    const [loading, setLoading] = React.useState(false)
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await axios.post('profile', values);
            notify('Hemos actualizado tus configuraciones de notificaciones con éxito.', 'success')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [axios])

    React.useEffect(() => {
        doFetch('/profile');
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <BaseForm
            save={save}
            saveButtonLabel='Actualizar'
            disabled={loading}
            record={record}
        >
            <Grid item xs={12}>
                <Checkbox
                    source="profile.general_notifications"
                    label='Recibir notificaciones generales'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.notify_mobile_app"
                    label='Recibir notificaciones sobre comentarios en aplicativo móvil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.notify_email"
                    label='Recibir notificaciones sobre comentarios en el correo electrónico vinculado'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.notify_about_chat"
                    label='Recibir notificaciones sobre mensajería'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.notify_about_account"
                    label='Recibir notificaciones sobre actualizaciones a la cuenta'
                />
            </Grid>
        </BaseForm>
    )
}

export default NotificationSettings
