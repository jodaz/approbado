import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useSubthemesDispatch, useSubthemeState } from '@approbado/lib/hooks/useSubthemeSelect';

export default function SubthemeItem(props) {
    const { id, name, finished } = props;
    const state = useSubthemeState();
    const { setSubtheme, unsetSubtheme } = useSubthemesDispatch();
    const status = state.map(({ id }) => id)

    const handleToggle = value => () => {
        if (status.indexOf(value) === -1) {
            setSubtheme(props)
        } else {
            unsetSubtheme(id)
        }
    };

    return (
        <ListItem key={id} button onClick={handleToggle(id)} disabled={finished}>
            <ListItemText id={id} primary={name} />
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(id)}
                    checked={status.indexOf(id) !== -1}
                    disabled={finished}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}
