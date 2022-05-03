import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import configs from '@approbado/lib/configs'

const useStyles = makeStyles(theme => ({
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    }
}))

const Select = props => {
    const classes = useStyles();
    const {
        meta: { touched, error, submitError, initial } = { touched, initial, error, submitError },
        input: { value: defaultValue, onChange,  name },
        meta,
        options
    } = props;
    const [value, setValue] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    return (
        <FormControl className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth">
            <Autocomplete
                name={name}
                open={open}
                fullWidth
                multiple
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionSelected={(option, value) => option.names === value.names}
                getOptionLabel={option => option.names}
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                    />
                )}
                renderOption={(option, { selected }) => (
                    <Box className={classes.userCard}>
                        <Avatar
                            src={`${configs.SOURCE}/${option.picture}`}
                            alt='photo_profile'
                        />
                        <Box className={classes.userInfo}>
                            <Box sx={{
                                fontSize: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 600
                            }}>
                                {option.names}
                            </Box>
                            <Box sx={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#6D6D6D'
                            }}>
                                {option.email}
                            </Box>
                        </Box >
                    </Box>
                )}
                value={value}
                onChange={async (event, newValue) => {
                    await setValue(newValue);

                    const ids = await newValue.map(item => item.id);
                    await onChange(ids)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
            />
            {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText>}
        </FormControl>
    );
}

Select.defaultProps = {
    icon: <></>,
    options: []
}

export default Select;
