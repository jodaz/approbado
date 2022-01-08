import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Confirm from '@approbado/lib/layouts/Confirm';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30rem',
        height: '15rem',
        textAlign: 'center'
    },
    link: {
        textDecoration: 'underline',
        color: theme.palette.info.main,
        '&visited': {
            color: theme.palette.info.main,
        }
    },
}));

const ForumWarning = () => {
    const classes = useStyles();
    const status = useDialogState('forums.warning');
    const { unsetDialog } = useDialogDispatch('forums.warning');
    const { setDialog: setCreateForumDialog } = useDialogDispatch('forums.create')

    return (
        <Confirm
            isOpen={status}
            content={
                <Box className={classes.root}>
                    <Typography variant="h5">
                        {'¡Importante!'}
                    </Typography>
                    <Typography variant="subtitle2">
                        {'Este foro es un espacio informativo, cualquier usuario puede consultar a la comunidad de Approbado. No se permiten publicaciones de discriminación, odio, aborrecimiento, falta de respeto y/o burla hacia algún usuario y no se permitirán publicaciones que no sean sobre temas académicos legales; de lo contrario cualquier usuario y/o administrador tiene la opción de reportarlo.'}
                    </Typography>
                    <Typography variant="subtitle2">
                        {'Para más infomación sobre advertencia y sanciones, haz click '}
                        <a
                            href="http://approbado.alaxatech.com/terminos-y-condiciones/"
                            target="_blank"
                            className={classes.link}
                        >
                            <strong>aquí</strong>
                        </a>
                        {'.'}
                    </Typography>
                </Box>
            }
            onConfirm={() => {
                unsetDialog();
                setCreateForumDialog();
            }}
            onClose={unsetDialog}
            confirmColor='primary'
            confirm={'Comenzar'}
            noCancel
        />
    );
}

export default ForumWarning;
