import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const NoContent = ({ icon, title }) => (
    <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'inherit'
    }}>
        {React.cloneElement(icon, {})}
        <Box>
            {title}
        </Box>
    </Box>
);

NoContent.propTypes = {
    title: PropTypes.string,
    icon: React.ReactElement
}

export default NoContent;
