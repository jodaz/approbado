import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Box } from '@material-ui/core';

const Menu = ({ onMenuClick, logout, dense = false, children }) => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    return (
        <Box mt={1}>
            {' '}
            {children}
        </Box>
    );
};

export default Menu;
