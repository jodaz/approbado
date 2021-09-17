import {
    makeStyles,
    Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.light,
        fontSize: '0.8em'
    }
}))

const EditButton = props => {
    const classes = useStyles()

    return (
        <Button
            onClick={() => console.log(props)}
            className={classes.root}
        >
            <EditIcon />
        </Button>
    )
}

export default EditButton;