import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { useLogout } from 'ra-core';

const useStyles = makeStyles(theme => ({
    button: {
        padding: '0.7rem 2rem',
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: '6px',
        boxShadow: 'none',
        color: theme.palette.error.main,
        backgroundColor: `${theme.palette.error.main} !important`,
        // '&:hover': {
        //     boxShadow: `0px 2px 2px -2px ${theme.palette.primary.main}`,
        //     backgroundColor: fade(theme.palette.secondary.main, 0.95)
        // }
    }
}));

const LogoutButton = ({ sidebarIsOpen }) => {
    const classes = useStyles();
    const logout = useLogout();

    const handleClick = () => logout();

    return (
        <Button
            className={classes.button}
            onClick={handleClick}
            fullWidth
        >
            {sidebarIsOpen && (
                <Typography variant="subtitle1">
                    {'Cerrar sesión'}
                </Typography>
            )}
        </Button>
    )
}

export default LogoutButton
