import * as React from 'react'
import {
    useRedirect,
    useDataProvider
} from 'react-admin'
// import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const DeleteAccount = () => {
    const [record, setRecord] = React.useState({})
    const dataProvider = useDataProvider();
    const redirect = useRedirect()

    const save = () => ({});

    return (
        <BaseForm
            save={save}
            record={record}
            saveButtonLabel='Guardar cambios'
        >
            <Grid container>
                <Typography variant="subtitle1">
                    Al realizar el proceso de eliminar tu cuenta de Approbado, tu nombre visible dentro
                    de la plataforma, tu @usuario y toda la información relacionada dentro de la plataforma
                    no se podrá recuperar.
                </Typography>
                <Typography variant="subtitle1">
                    Si solo quieres cambiar tu correo electrónico, no es necesario eliminar tu cuenta
                    cámbialo en tu <Link to="profile">perfil</Link>.
                </Typography>
                <Typography variant="subtitle1">
                    Para usar tu usuario u otra dirección de correo electrónico en otra cuenta de approbado,
                    <Link to="profile">cámbialos</Link> antes de eliminar esta cuenta.
                </Typography>
            </Grid>
        </BaseForm>
    )
}

DeleteAccount.defaultProps = {
    basePath: '/account',
    resource: 'account'
}

export default DeleteAccount
