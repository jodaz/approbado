import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as CloseIcon} from '@approbado/lib/icons/Close.svg';
import Typography from '@material-ui/core/Typography';

export default function CustomizedDialogs({ trivia_id, id }) {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Agregar preguntas
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        Agregar preguntas
                    </Typography>
                    <Typography gutterBottom>
                        Selecciona la forma en la que deseas agregar las preguntas
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-evenly"
                        flexDirection="column"
                        height="8rem"
                    >
                        <Button
                            variant="outlined"
                            onClick={() => history.push(`/trivias/${trivia_id}/subthemes/${id}/questions/upload`)}
                        >
                            Subir de forma masiva
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => history.push(`/trivias/${trivia_id}/subthemes/${id}/questions/create`)}
                        >
                            Agregar una pregunta
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
