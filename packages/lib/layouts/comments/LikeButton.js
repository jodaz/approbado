import * as React from 'react'
import LikeIcon from '@approbado/lib/icons/LikeIcon'
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

const styles = {
    root: {
        fontSize: '1rem',
        color: 'inherit',
        marginRight: '0.5rem',
    }
};

const LikeButton = ({ id, classes }) => {
    return (
        <LikeIcon className={classes.root} />
    )
}

export default withStyles(styles)(LikeButton)
