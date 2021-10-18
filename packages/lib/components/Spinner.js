import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

const styles = {
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE835'
    },
    loader: {
        height: '5em !important',
        width: '5em !important',
    }
};

const Spinner = ({ classes, className }) => (
    <Box className={clsx(classes.root, className)}>
        <CircularProgress className={classes.loader}/>
    </Box>
);

export default withStyles(styles)(Spinner);
