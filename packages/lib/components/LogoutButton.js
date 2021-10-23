import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import LogoutIcon from '@approbado/lib/icons/LogoutIcon'
import { useLogout } from 'ra-core';

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

const LogoutButton = props => {
    const classes = useStyles();
    const logout = useLogout();

    const handleClick = () => logout();

    return (
        <Button
            startIcon={<LogoutIcon />}
            className={classes.button}
            onClick={handleClick}
        >
            {props.children}
        </Button>
    )
}

export default LogoutButton
