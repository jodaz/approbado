import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ReactComponent as Certificate } from '@approbado/lib/icons/Certificate.svg'
import Box from '@material-ui/core/Box';
import configs from '@approbado/lib/configs'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SubthemeItem from './SubthemeItem'
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#F7F7F7',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.2rem',
        justifyContent: 'space-between'
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
                <Box sx={{
                    display: 'flex',
                    flexGrow: '2'
                }}>
                    <Box sx={{
                        display: 'flex',
                        minWidth: '3rem'
                    }}>
                        {(type == 'Insignia') ? (
                            <Avatar
                                src={`${configs.SOURCE}/${file}`}
                                alt='icon'
                            />
                        ) : (
                            <Certificate />
                        )}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        {title}
                    </Box>
                </Box>
                <Box
                    component='span'
                    sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        width: 'min-content'
                    }}
                >
                    {min_points} puntos
                </Box>
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
