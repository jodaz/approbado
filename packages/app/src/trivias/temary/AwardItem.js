import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ReactComponent as Certificate } from '@approbado/lib/icons/Certificate.svg'
import Box from '@material-ui/core/Box';
import configs from '@approbado/lib/configs'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SubthemeItem from './SubthemeItem'
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#F7F7F7',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.2rem'
    },
    text: {
        fontSize: '0.9rem',
        fontWeight: 600
    }
}))

export default function AwardItem(props) {
    const {
        key,
        file,
        min_points,
        title,
        type,
        subthemes
    } = props
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClick = () => {
        setOpen(!open);
    };

    const renderSubthemes = data => data.map(subtheme => (
        <SubthemeItem {...subtheme} />
    ))

    return (
        <>
            <ListItem
                button
                className={classes.root}
                onClick={handleClick}
                key={key}
            >
                <ListItemAvatar>
                    {(type == 'Insignia') ? (
                        <Avatar
                            src={`${configs.SOURCE}/${file}`}
                            alt='icon'
                        />
                    ) : (
                        <Certificate />
                    )}
                </ListItemAvatar>
                <Box className={classes.text}>
                    {title}
                </Box>
                <ListItemSecondaryAction className={classes.text}>
                    {min_points} puntos
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {(subthemes.length) ? renderSubthemes(subthemes) : (
                        <Box>
                            Sin subtemas
                        </Box>
                    )}
                </List>
            </Collapse>
        </>
    );
}
