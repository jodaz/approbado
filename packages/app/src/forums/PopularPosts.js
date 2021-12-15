import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';

const AsideBar = ({ data, isXSmall }) => (
    <Box>
        {!isXSmall && (
            <Box p='0 0 0 2rem'>
                <Typography component="div">
                    <Box sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
                        {'Debates más hots'}
                    </Box>
                </Typography>
                <Typography component="div">
                </Typography>
            </Box>
        )}
    </Box>
);

AsideBar.propTypes = {
    data: PropTypes.object,
    isXSmall: PropTypes.bool
}

export default AsideBar
