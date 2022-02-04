import * as React from 'react';
import { Query, useMutation, useNotify, useRefresh } from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as CloseIcon} from '@approbado/lib/icons/Close.svg';
import Typography from '@material-ui/core/Typography';
import Spinner from '@approbado/lib/components/Spinner'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuButton from '@approbado/lib/components/MenuButton'
import InformationIcon from '@approbado/lib/icons/InformationIcon'
import { makeStyles } from '@material-ui/core/styles';
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import Button from '@approbado/lib/components/Button'

const payload = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'created_at', order: 'DESC'}
};

const useStyles = makeStyles(
    theme => ({
        title: {
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.18)",
            '& > *': {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: '1rem',
                paddingRight: '0.5rem',
                alignItems: 'center'
            }
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        padding: {
            padding: '0.5rem 1rem',
            borderRadius: '6px'
        }
    }),
    { name: 'RaDialog' }
);

export default function ReportDialog({ post_id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const spinnerStyles = useSpinnerStyles();
    const [mutate, { loading, data, loaded }] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        event.stopPropagation();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
        setSelectedIndex(null);
    };

    const handleSubmit = React.useCallback(async () => {
        try {
            await mutate({
                type: 'create',
                resource: 'reports',
                payload: { data: { reason_id: selectedIndex, post_id: post_id } }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, selectedIndex]);

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Ha reportado la publicación exitosamente!', 'success');
            refresh();
            handleClose();
        }
    }, [data, loaded])

    return (
        <div>
            <MenuButton
                label="Reportar"
                icon={<InformationIcon />}
                onClick={handleClickOpen}
            />
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle className={classes.title}>
                    <Typography variant="subtitle1">
                        Reportar una publicación
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Typography variant="subtitle1" className={classes.padding}>
                        {'Ayúdanos a entender el problema'}
                    </Typography>
                    <Query type='getList' resource='report-reasons' payload={payload}>
                        {({ data, total, loading, error }) => {
                            if (loading) { return <Spinner classes={spinnerStyles} /> }
                            if (error) { return null; }

                            return (
                                <List component="nav" aria-label="secondary mailbox folder" style={{ width: '100%', marginBottom: '1rem' }}>
                                    {data.map(reason => (
                                        <ListItem
                                            button
                                            selected={selectedIndex === reason.id}
                                            onClick={(event) => handleListItemClick(event, reason.id)}
                                            disableGutters
                                            className={classes.padding}
                                        >
                                            <ListItemText primary={reason.item} />
                                        </ListItem>
                                    ))}
                                </List>
                            );
                        }}
                    </Query>
                    {(selectedIndex) && (
                        <Button disabled={loading} onClick={handleSubmit} unresponsive>
                            {'Enviar'}
                        </Button>
                    )}
                    <Typography variant="body2"  className={classes.padding}>
                        Para más infomación sobre advertencia y sanciones, click aquí
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
