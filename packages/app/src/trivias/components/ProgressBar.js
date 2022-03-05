import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { withStyles, fade } from '@material-ui/core/styles';

const normalise = (current, total) => (current - 0) * 100 / (total - 0);

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#CFCEFE',
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.info.main
    },
}))(LinearProgress);

const ProgressBar = ({ current, total }) => (
    <Box display="flex" alignItems="center" justifyContent="center">
        <Box width="100%" mr={1}>
            <BorderLinearProgress thickness={10} variant="determinate" value={normalise(current, total)} />
        </Box>
        <Box minWidth={35} fontWeight='600' minWidth='3rem'>
            {`${current} / ${total}`}
        </Box>
    </Box>
)

export default ProgressBar
