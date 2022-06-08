import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { Field } from 'react-final-form'

const ControllableSelectInput = props => {
    const {
        meta: { touched, error, submitError, initial } = { touched, initial, error, submitError },
        input: { onChange, value, ...restInputProps },
        meta,
        options,
        property,
        inputProps
    } = props;

    if (!options.length) return null;

    return (
        <FormControl className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth">
            <Autocomplete
                value={value}
                {...restInputProps}
                options={options}
                getOptionLabel={option => option[property]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...inputProps}
                    />
                )}
                onChange={(event, option) => (onChange(option.id))}
                fullWidth
            />
            {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText>}
        </FormControl>
    );
}

const Select = props => (
    <Field
        component={ControllableSelectInput}
        {...props}
    />
);

ControllableSelectInput.defaultProps = {
    property: 'name'
}

export default Select;
