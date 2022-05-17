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
import Skeleton from "@material-ui/lab/Skeleton";

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

const NotificationCard = ({ data, rootRef, index }) => {
    const loading = true;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = e => {
        setExpanded(!expanded);
        e.preventDefault();
    };

    return (
        <Card
            className={classes.root}
            onClick={handleExpandClick}
            ref={rootRef}
            key={index}
        >
            <CardHeader
                className={classes.header}
                avatar={
                    !loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    ) : (
                        <Avatar
                            aria-label="recipe"
                            src={`${configs.SOURCE}/${data.user.picture}`}
                        />
                    )
                }
                action={
                    <OptionsCardMenu>
                        <DeleteButton
                            basePath='notifications'
                            confirmColor='warning'
                            confirmTitle='Eliminar notificación'
                            confirmContent='¿Está seguro que desea eliminar esta notificación?'
                            label='Eliminar esta notificación'
                        />
                    </OptionsCardMenu>
                }
                title={
                    !loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                        <Box
                            component='div'
                            className={classes.title}
                            dangerouslySetInnerHTML={{ __html: data.data }}
                        />
                    )
                }
                subheader={
                    !loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="20%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                        format(new Date(data.created_at), 'eee. d, MMMM', { locale: es }).toUpperCase()
                    )
                }
            />
            <Collapse in={loading && expanded} timeout="auto" unmountOnExit>
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

export default NotificationCard
