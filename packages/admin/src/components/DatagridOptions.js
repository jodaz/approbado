import * as React from 'react'
import { EditButton } from 'react-admin'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types';
import { ReactComponent as Edit } from '@approbado/lib/icons/Edit.svg'

const DatagridOptions = ({ children, confirmTitle, confirmContent, deleteButtonLabel, ...rest }) => (
    <Box component='div' display='flex' justifyContent='end'>
        <EditButton
            icon={<Edit />}
            label=''
            {...rest}
        />
        <DeleteButton
            confirmColor='warning'
            confirmTitle={confirmTitle}
            confirmContent={confirmContent}
            label={deleteButtonLabel}
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
