import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function SubthemeItem(props) {
    const { id, name } = props;
    const [checked, setChecked] = React.useState([1]);

    console.log(checked.indexOf(id))
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
        <ListItem key={id} button>
            <ListItemText id={id} primary={name} />
            <ListItemSecondaryAction>
            <Checkbox
                edge="end"
                onChange={handleToggle(id)}
                checked={checked.indexOf(id) !== -1}
            />
            </ListItemSecondaryAction>
        </ListItem>
    );
}
