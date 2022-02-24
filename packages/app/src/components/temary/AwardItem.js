import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import configs from '@approbado/lib/configs'
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: fade(theme.palette.primary.light, '0.3'),
        display: 'flex',
        alignItems: 'center'
    }
}))

export default function AwardItem(props) {
    const {
        file,
        min_points,
        title,
    } = props
    const classes = useStyles();

    return (
        <ListItem className={classes.root}>
            <ListItemAvatar>
                <img src={`${configs.SOURCE}/${file}`}
            />
            </ListItemAvatar>
            <ListItemText primary={title} />
                <ListItemSecondaryAction>
                    <Typography variant="body2">
                        {min_points} puntos
                    </Typography>
                </ListItemSecondaryAction>
        </ListItem>
    );
}
