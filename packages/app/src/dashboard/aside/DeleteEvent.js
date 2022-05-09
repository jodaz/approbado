import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, fade } from '@material-ui/core/styles';
import Button from '@approbado/lib/components/Button'
import Box from '@material-ui/core/Box';
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as QuizIllustration } from '@approbado/lib/illustrations/Quiz.svg'
import { axios } from '@approbado/lib/providers'

const TYPES = [
    { id: 'none', name: 'none' },
    { id: 'De pago', name: 'De pago' }
]

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'end'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    padding: {
        padding: '0.5rem 1rem',
        borderRadius: '6px'
    },
    cancelButton: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.light, 0.9)
        }
    },
    submitButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.light,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.9)
        }
    }
}));

export default function() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
    };

    const handleDelete = React.useCallback(async (id) => {
        try {
            const { data } = axios.delete(`/schedules/${id}`)
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    console.log(open)

    return (
        <div>
            <MenuItem onClick={handleClickOpen}>
                Eliminar
            </MenuItem>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle className={classes.title}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        unresponsive
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Box width='20rem' display='flex' justifyContent="center" flexDirection='column'>
                        <NoContent
                            icon={<QuizIllustration />}
                            title={
                                <Box textAlign='center'>
                                    <Box sx={{ fontWeight: 600 }}>
                                        ¿Quieres eliminar esta trivia?
                                    </Box>
                                    <Box sx={{ fontWeight: 400 }}>
                                        Si eliminas tu trivia, afectará a todos los participantes involucrados
¿Quieres continuar?
                                    </Box>
                                </Box>
                            }
                        />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: '5.5rem',
                            padding: '1rem 0',
                            width: '100%'
                        }}>
                            <Button onClick={handleClose} className={classes.cancelButton}>
                                Cancelar
                            </Button>
                            <Button className={classes.submitButton}>
                                Sí, quiero continuar
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
