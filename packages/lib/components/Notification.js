import * as React from 'react'
import Dialog from '@approbado/lib/components/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux';
import {
    hideNotification,
    getNotification,
} from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        background: "linear-gradient(135.16deg, #E6EA00 -22.35%, #FDE000 113.73%)",
        boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        textTransform: 'none',
        boxShadow: "4px 4px 40px 0px #00000014",
        padding: '0.3rem 2rem',
        marginTop: '2rem',
        fontWeight: 'bold'
    },
}))

const Notification = () => {
    const [open, setOpen] = React.useState(false);
    const notification = useSelector(getNotification);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = React.useCallback(() => {
        setOpen(false);
        dispatch(hideNotification());
    }, [dispatch, setOpen]);

    React.useEffect(() => {
        setOpen(!!notification);
    }, [notification]);

    return (
        <Dialog open={open} handleClose={handleClose}>
            <Typography gutterBottom>
                {notification && notification.message}
            </Typography>
            <Button onClick={handleClose} className={classes.button}>
                Confirmar
            </Button>
        </Dialog>
    )
}

export default Notification;
