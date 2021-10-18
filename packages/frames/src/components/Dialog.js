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
    },
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
    link: {
        textDecoration: 'underline',
        color: theme.palette.primary.main,
        '&visited': {
            color: theme.palette.primary.main,
        }
    }
}));

const CustomizedBackdrop = styled(Backdrop)({
    background: 'transparent'
});

export default function CustomizedDialogs({ open, handleClose }) {
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
                <Typography gutterBottom>
                    ¡Lo siento! Nuestra app estará disponible muy pronto.
                </Typography>
                <Typography gutterBottom>
                    Mientras puedes leer nuestro{' '}
                        <a href="https://approbado.villakid.com/blog/" className={classes.link}>
                            blog
                            </a>.
                </Typography>
                <Button onClick={handleClose}>
                    Vale, entendido
                </Button>
            </DialogContent>
        </Dialog>
    );
}
