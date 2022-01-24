import * as React from 'react';
import { Query } from 'react-admin';
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
import { ReactComponent as InformationIcon } from '@approbado/lib/icons/Information.svg'
import { makeStyles } from '@material-ui/core/styles';

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

export default function ReportDialog({ trivia_id, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                            if (loading) { return <Spinner /> }
                            if (error) { return null; }

                            return (
                                <List component="nav" aria-label="secondary mailbox folder">
                                    {data.map(d => (
                                        <ListItem
                                            button
                                            selected={selectedIndex === d.id}
                                            onClick={(event) => handleListItemClick(event, d.id)}
                                            disableGutters
                                            className={classes.padding}
                                        >
                                            <ListItemText primary={d.item} />
                                        </ListItem>
                                    ))}
                                </List>
                            );
                        }}
                    </Query>
                    <Typography variant="body2"  className={classes.padding}>
                        Para más infomación sobre advertencia y sanciones, click aquí
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
