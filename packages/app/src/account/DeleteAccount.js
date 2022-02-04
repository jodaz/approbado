import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ReactComponent as DeleteIllustration } from '@approbado/lib/illustrations/delete.svg';
import Box from '@material-ui/core/Box';
import Confirm from '@approbado/lib/layouts/Confirm';
import Button from '@material-ui/core/Button';
import { axios } from '@approbado/lib/providers'
import configs from '@approbado/lib/configs'

const DeleteAccount = () => {
    const [loading, setLoading] = React.useState(false)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDelete = React.useCallback(async () => {
        setLoading(!loading)
        try {
            await axios.get('auth/delete-account');

            window.location.href =
                `${configs.REDIRECT_TO}`;
        } catch (err) {
            console.log(err)
        }
        setLoading(!loading)
    }, [axios])

    const handleDialog = e => {
        setOpen(!open);
        e.stopPropagation();
    };

    return (
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
            <Grid item xs={12}>
                <Button
                    onClick={handleDialog}
                    className={classes.deleteButton}
                    key="button"
                    variant='outlined'
                    size='large'
                >
                    <Typography variant="subtitle2">
                        {'Eliminar cuenta'}
                    </Typography>
                </Button>
            </Grid>
            <Confirm
                isOpen={open}
                loading={loading}
                title='Eliminar cuenta'
                content={
                    <Box width='20rem' textAlign='center' padding='1rem 0'>
                        <DeleteIllustration />
                        <Typography variant="subtitle1">
                            {'¿Estás seguro de eliminar tu cuenta?'}
                        </Typography>
                        <Typography variant="subtitle2">
                            {'Al eliminar tu cuenta, se borrarán todos tus datos permanentemente y ya no se podrá recuperar.'}
                        </Typography>
                    </Box>
                }
                onConfirm={handleDelete}
                onClose={handleDialog}
                confirmColor='warning'
            />
        </Grid>
    )
}

const useStyles = makeStyles(
    theme => ({
        deleteButton: {
            color: theme.palette.error.main,
            borderRadius: '4px',
            textTransform: 'none',
            borderColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.light, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaDeleteWithConfirmButton' }
);

DeleteAccount.defaultProps = {
    basePath: '/account',
    resource: 'account'
}

export default DeleteAccount
