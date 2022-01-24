import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import configs from '@approbado/lib/configs'
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxListSecondary() {
    const [secondary, setSecondary] = React.useState(false);
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Box>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem>
                    <ListItemAvatar>
                        <img src={`${configs.SOURCE}/public/default/insignia_bronce.svg`} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Approbado bronce"
                    />
                        <ListItemSecondaryAction>
                            <Typography variant="body2">
                                100 puntos
                            </Typography>
                        </ListItemSecondaryAction>
                </ListItem>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;

                    return (
                    <ListItem key={value} button>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
