import * as React from 'react';
import { makeStyles, styled } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    root: {
        border: '0 !important',
        borderRadius: '6px !important',
    }
}));

const CustomizedBackdrop = styled(Backdrop)({
    background: 'transparent'
});

export default function CustomizedDialogs({ open, handleClose, children }) {
    const classes = useStyles();

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
            BackdropComponent={CustomizedBackdrop}
        >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}
