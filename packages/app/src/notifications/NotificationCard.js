import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import makeStyles from '@material-ui/styles/makeStyles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import configs from '@approbado/lib/configs'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        borderBottom: '1px solid #D1D1D1',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main
    },
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    header: {
        padding: '0rem'
    },
    content: {
        padding: '0 0 0 3.5rem',
        height: '4rem',
        '&:last-child': {
            paddingBottom: 'unset !important'
        }
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        marginLeft: 'auto'
    }
}));

export default function NotificationCard({
    created_at,
    data,
    user,
    type,
    long_data,
    post_id
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = e => {
        setExpanded(!expanded);
        e.preventDefault();
    };

    return (
        <Card className={classes.root} onClick={handleExpandClick}>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${configs.SOURCE}/${user.picture}`}
                    />
                }
                action={
                    <OptionsCardMenu>
                        <DeleteButton
                            label='Eliminar'
                            basePath='notifications'
                            confirmColor='warning'
                            confirmTitle='Eliminar notificación'
                            confirmContent='¿Está seguro que desea eliminar esta notificación?'
                            label='Eliminar esta notificación'
                        />
                    </OptionsCardMenu>
                }
                title={
                    <Box
                        component='div'
                        className={classes.title}
                        dangerouslySetInnerHTML={{ __html: data }}
                    />
                }
                subheader={format(new Date(created_at), 'eee. d, MMMM', { locale: es }).toUpperCase()}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CardActions className={classes.actions} disableSpacing>
                        <Button variant="outlined" color="secondary">
                            Rechazar
                        </Button>
                        <Button variant="contained" color="primary">
                            Aceptar
                        </Button>
                    </CardActions>
                </CardContent>
            </Collapse>
        </Card>
    );
}
