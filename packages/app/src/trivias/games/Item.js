import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: ({ isRight }) => ({
        borderRadius: '6px',
        backgroundColor: 'transparent',
        opacity: 'unset',
        border: isRight
            ? `3px solid ${theme.palette.success.main} !important`
            : `3px solid ${theme.palette.error.main} !important`
    })
}))

const Item = ({ isRight, children, ...rest }) => {
    const classes = useStyles({ isRight: isRight })

    return (
        <ListItem className={classes.root} {...rest}>
            {children}
        </ListItem>
    )
}

export default Item;
