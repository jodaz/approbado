import TextField from '@material-ui/core/TextField';

const renderInput = ({
  meta: { touched, error } = { touched, error },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export default renderInput;
