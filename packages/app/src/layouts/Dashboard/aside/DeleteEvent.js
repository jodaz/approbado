import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Button from '@approbado/lib/components/Button'
import Box from '@material-ui/core/Box';
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as QuizIllustration } from '@approbado/lib/illustrations/Quiz.svg'
import { axios } from '@approbado/lib/providers'
import { ReactComponent as TrashIcon } from '@approbado/lib/icons/Trash.svg'
import { unsetSchedule } from '@approbado/lib/actions'
import { useDispatch } from 'react-redux';

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
            backgroundColor: alpha(theme.palette.secondary.light, 0.9)
        }
    },
    submitButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.light,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: alpha(theme.palette.error.main, 0.9)
        }
    }
}));

export default function({ onClick, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    const dispatch = useDispatch();
    const [deleteDialog, setDeleteDialog] = React.useState(false)

    const handleClickOpen = e => {
        setOpen(true);
    };

    const handleClose = e => {
        setOpen(false);
        e.preventDefault();
        e.stopPropagation();
    };

    const handleCloseDeleteDialog = e => {
        setDeleteDialog(false)
        e.preventDefault();
        e.stopPropagation();
        onClick();
    }

    const handleDelete = React.useCallback(async () => {
        try {
            const { data } = await axios.delete(`/schedules/${id}`)

            if (data) {
                await setDeleteDialog(true)
                await dispatch(unsetSchedule(data))
                handleClose();
            }
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <>
            <MenuItem ref={ref} onClick={handleClickOpen}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                }}>
                    <TrashIcon />
                </Box>
                Eliminar
            </MenuItem>
            <Dialog open={open} onClose={handleClose}>
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
                            <Button
                                onClick={handleClose}
                                className={classes.cancelButton}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className={classes.submitButton}
                                onClick={handleDelete}
                            >
                                Sí, quiero continuar
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle className={classes.title}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDeleteDialog}
                        unresponsive
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Box
                        width='20rem'
                        display='flex'
                        justifyContent="center"
                        flexDirection='column'
                    >
                        <NoContent
                            icon={<QuizIllustration />}
                            title={
                                <Box textAlign='center'>
                                    <Box sx={{ fontWeight: 600 }}>
                                        La trivia ha sido eliminada
                                    </Box>
                                </Box>
                            }
                        />
                        <Box sx={{
                            display: 'flex',
                            padding: '1rem 0',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <Button
                                onClick={handleCloseDeleteDialog}
                                className={classes.cancelButton}
                            >
                                De acuerdo.
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
