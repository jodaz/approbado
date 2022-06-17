import * as React from 'react';
import { makeStyles } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@approbado/lib/icons/CloseIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as QuizzIllustration } from '@approbado/lib/illustrations/Quiz.svg'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
    root: {
        border: '0 !important',
        borderRadius: '6px !important',
    },
    title: {
        display: 'flex',
        justifyContent: 'end'
    }
}));

const SuccessDialog = ({ open, handleClose, title, ...rest }) => (
    <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...rest}
    >
        <Box sx={{
            display: 'flex',
            justifyContent: 'end'
        }}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                unresponsive
            >
                <CloseIcon />
            </IconButton>
        </Box>
        <DialogContent>
            <NoContent
                icon={<QuizzIllustration />}
                title={
                    <Box sx={{
                        textAlign: 'center',
                        color: '#000000',
                        width: '20rem',
                        padding: '1rem'
                    }}>
                        <Box sx={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
                            {title}
                        </Box>
                        <Box sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Felicidades! Diviertete realizando las increíbles trivias que tenemos para ti
                        </Box>
                    </Box>
                }
            />
        </DialogContent>
    </Dialog>
);

SuccessDialog.defaultProps = {
    children: <></>,
    title: 'Acabas de crear una trivia'
}

export default SuccessDialog
