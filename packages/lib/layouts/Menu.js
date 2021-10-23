import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Box } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Menu = ({ onMenuClick, logout, dense = false, children }) => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    return (
        <Box mt={1} textAlign="left" padding={open && "0 1rem"}>
            <Box width="80%" height="2rem" margin="1rem">
                {(open) && (
                    <Link to='/'>
                        <img
                            src={`${process.env.PUBLIC_URL}/logotipo_white.png`} alt='approbado_logotipo'
                            height="100%"
                            width="100%"
                        />
                    </Link>
                )}
            </Box>
            {React.Children.map(children, (menuItem) =>
                React.cloneElement(menuItem, {
                    open: open,
                })
            )}
        </Box>
    );
};

export default Menu;
