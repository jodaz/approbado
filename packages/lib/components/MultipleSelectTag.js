import * as React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useReferenceArrayInputContext } from 'react-admin';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const MultipleSelectTag = ({ value, ...rest }) => {
    const [data, setData] = React.useState([])
    const { choices } = useReferenceArrayInputContext();

    if (!choices) return null;

    React.useEffect(() => {
        if (value.length || data.length > 0) {
            setData(value)
        }
    }, [value])

    return (
        <FormControl variant="filled" fullWidth>
            <Select
                multiple
                renderValue={(selected) => selected.map(i => i.name).join(', ')}
                value={value}
                fullWidth
                {...rest}
            >
                {choices.map((choice, i) => (
                    <MenuItem key={i} value={choice}>
                        <Checkbox checked={data.indexOf(choice) > -1} />
                        <ListItemText key={i} primary={choice.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultipleSelectTag;
