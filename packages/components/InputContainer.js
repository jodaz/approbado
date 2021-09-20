import * as React from 'react'
import { Grid, InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types';

const InputContainer = ({ children, labelName, ...rest }) => (
    <Grid item xs={12} sm={12} md={6}>
        <InputLabel>{labelName}</InputLabel>
        {React.cloneElement(children, rest)}
    </Grid>
)

InputContainer.propTypes = {
    children: PropTypes.node
};

InputContainer.defaultProps = {
    label: false,
    labelName: 'Input'
}

export default InputContainer