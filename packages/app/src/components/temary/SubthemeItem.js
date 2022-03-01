import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useSubthemesDispatch, useSubthemeState } from '@approbado/lib/hooks/useSubthemeSelect';

export default function SubthemeItem(props) {
    const { id, name } = props;
    const state = useSubthemeState();
    const { setSubtheme, unsetSubtheme } = useSubthemesDispatch();

    const handleToggle = (value) => () => {
        if (state.indexOf(value) === -1) {
            setSubtheme(value)
        } else {
            unsetSubtheme(value)
        }
    };

    return (
        <ListItem key={id} button onClick={handleToggle(id)}>
            <ListItemText id={id} primary={name} />
            <ListItemSecondaryAction>
            <Checkbox
                edge="end"
                onChange={handleToggle(id)}
                checked={state.indexOf(id) !== -1}
            />
            </ListItemSecondaryAction>
        </ListItem>
    );
}
