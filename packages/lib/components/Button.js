import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    loader: {
        margin: '0.36rem'
    },
    button: {
        padding: '0.7rem 2rem',
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: '6px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0px 2px 2px -2px ${theme.palette.primary.main}`,
            backgroundColor: fade(theme.palette.secondary.main, 0.95)
        }
    }
}));

const CustomButton = ({ disabled, children, ...rest }) => {
    const classes = useStyles();

    return (
        <Button
            variant='contained'
            color='secondary'
            type="submit"
            className={classes.button}
            disabled={disabled}
            {...rest}
        >
            {(!disabled)
                ? <Typography variant="subtitle1">
                    {children}
                </Typography>
                : <CircularProgress className={classes.loader} size={'1rem'} />
            }
        </Button>
    )
}

CustomButton.defaultProps = {
    fullWidth: true,
    disabled: false
}

export default CustomButton
