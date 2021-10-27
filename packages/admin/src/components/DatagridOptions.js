import * as React from 'react'
import { EditButton, DeleteButton } from 'react-admin'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types';
import EditOutlined from '@material-ui/icons/EditOutlined';

const DatagridOptions = ({ children, ...rest }) => (
    <Box component='div' display='flex' justifyContent='end'>
        <EditButton
            icon={<EditOutlined />}
            label=''
            {...rest}
        />
        <DeleteButton
            {...rest}
        />
        {React.cloneElement(children, rest)}
    </Box>
)

DatagridOptions.propTypes = {
    children: PropTypes.node
};

DatagridOptions.defaultProps = {
    children: <React.Fragment />
}

export default DatagridOptions
