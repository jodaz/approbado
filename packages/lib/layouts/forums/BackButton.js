import * as React from 'react';
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.info.light,
        display: 'flex',
        alignItems: 'center',
        fontWeight: '700',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    icon: {
        marginRight: '1rem'
    }
}))

const BackButton = () => {
    const history = useHistory();
    const classes = useStyles();

    const goBackHandler = () => history.push('/forums')

    return (
        <Typography component="div">
            <Box className={classes.root} onClick={goBackHandler}>
                <LeftAngleIcon className={classes.icon} />
                Volver al Foro
            </Box>
        </Typography>
    )
}

export default BackButton;
