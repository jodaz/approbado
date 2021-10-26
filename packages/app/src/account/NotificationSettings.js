import * as React from 'react'
import {
    useRedirect,
    useDataProvider
} from 'react-admin'
// import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import { Field } from 'react-final-form';
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'

const NotificationSettings = () => {
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
                <Checkbox
                    source="show_name"
                    label='Mostrar mi nombre cuando vean mi perfil'
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="display_name"
                    type="checkbox"
                    value="display_name"
                    component={Checkbox}
                >
                    <label>
                        Recibir notificaciones generales
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
                        Recibir notificaciones sobre comentarios en aplicativo móvil
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
                        Recibir notificaciones sobre comentarios en el correo electrónico vinculado
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
                        Recibir notificaciones sobre mensajería
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
                        Recibir notificaciones sobre actualizaciones a la cuenta
                    </label>
                </Field>
            </Grid>
        </BaseForm>
    )
}

NotificationSettings.defaultProps = {
    basePath: '/account',
    resource: 'profile'
}

export default NotificationSettings
