import ChatBubbleIcon from '@approbado/lib/icons/ChatBubbleIcon'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        marginRight: '0.5rem',
        fontSize: '1rem',
        color: 'inherit'
    }
};

const ReplyIcon = ({ classes }) => (
    <ChatBubbleIcon className={classes.root} />
)

export default withStyles(styles)(ReplyIcon);
