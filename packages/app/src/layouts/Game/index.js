import { makeStyles } from '@material-ui/core';
import AppBar from '@approbado/lib/layouts/AppBar';
import Notification from '@approbado/lib/components/Notification'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        minWidth: 'fit-content',
        width: '100%',
        color: theme.palette.getContrastText(
            theme.palette.background.default
        ),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        padding: '0 1rem !important',
        marginTop: '4em',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '80%'
        }
    },
}));

export default ({ children }) => {
    const classes = styles()
    const triviaState = useTriviaState()

    return (
        <>
            <div className={classes.root}>
                <AppBar {...triviaState} fullWidth={triviaState.selected} />
                <main className={classes.content}>
                    {children}
                </main>
            </div>

            <Notification />
        </>
    )
};
