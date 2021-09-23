import * as React from 'react'
import { Grid, InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types';

const InputContainer = ({ children, labelName, md, ...rest }) => (
    <Grid item xs={12} sm={12} md={md}>
        <InputLabel>{labelName}</InputLabel>
        {React.cloneElement(children, rest)}
    </Grid>
)

InputContainer.propTypes = {
    children: PropTypes.node,
    md: PropTypes.number,
    lg: PropTypes.number
};

InputContainer.defaultProps = {
    label: "",
    labelName: 'Input',
    children: <React.Fragment />,
    md: 6,
    lg: 3
}

export default InputContainer
