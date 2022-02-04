import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import LogoutIcon from '@approbado/lib/icons/LogoutIcon'
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'
import { useHistory } from 'react-router-dom'
import configs from '@approbado/lib/configs'

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: '6px',
        boxShadow: 'none',
        color: theme.palette.error.main,
        marginLeft: '10px'
    }
}));

const LogoutButton = ({ children }) => {
    const classes = useStyles();
    const { unsetUser: logout } = useUserDispatch();
    const history = useHistory()
    const { NAME, REDIRECT_TO } = configs;

    const handleClick = async () => {
        await logout();

        if (NAME == 'admin') {
            await history.push('/login')
        } else {
            return window.location.href = `${REDIRECT_TO}`
        }
    }

    return (
        <Button
            startIcon={<LogoutIcon />}
            className={classes.button}
            onClick={() => handleClick()}
        >
            {children}
        </Button>
    )
}

export default LogoutButton
