import * as React from 'react'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton'

const DatagridOptions = ({ children, confirmTitle, confirmContent, deleteButtonLabel, ...rest }) => (
    <Box component='div' display='flex' justifyContent='end'>
        <LinkButton size="small" label=''to={`/${rest.basePath}/${rest.record.id}`} />
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
