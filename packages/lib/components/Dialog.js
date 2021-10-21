import * as React from 'react';
import { makeStyles } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
    root: {
        border: '0 !important',
        borderRadius: '6px !important',
    }
}));

CustomizedDialogs.defaultProps = {
    children: <></>
}

export default function CustomizedDialogs({ open, handleClose, children, backdrop }) {
    const classes = useStyles();

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
            BackdropComponent={backdrop && backdrop}
        >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}
