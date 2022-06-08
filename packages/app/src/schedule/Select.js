import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const Select = props => {
    const {
        meta: { touched, error, submitError, initial } = { touched, initial, error, submitError },
        input: { value: defaultValue, onChange,  name },
        meta,
        options,
        icon
    } = props;
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (defaultValue && options.length) {
            const newValue = options.filter(item => item.id == defaultValue);

            setValue(newValue[0])
        }
    }, [defaultValue, options])

    // if (defaultValue && !value) return null;

    return (
        <FormControl className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth">
            <Autocomplete
                name={name}
                open={open}
                fullWidth
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <Box marginLeft='6px' display='flex'>
                                    {icon}
                                </Box>
                            ),
                        }}
                    />
                )}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    onChange(newValue.id)
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
