import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

export default ({
    meta: { touched, error, submitError } = { touched, error, submitError },
    input: { ...inputProps },
    meta,
    ...props
}) => (
    <Checkbox
        error={!!(touched && error || submitError)}
        helperText={touched && error || submitError}
        checked={Boolean(false)}
        {...inputProps}
        {...props}
    />
)
