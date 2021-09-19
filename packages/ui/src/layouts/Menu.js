import * as React from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Box } from '@material-ui/core';
import {
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';
import users from '../users';
import trivias from '../trivias'

const Menu = ({ onMenuClick, logout, dense = false }) => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <MenuItemLink
                to={trivias.name}
                primaryText={trivias.options.label}
                leftIcon={<trivias.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={users.name}
                primaryText={users.options.label}
                leftIcon={<users.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to="/configurations"
                primaryText={'Configuraciones'}
                leftIcon={<SettingsIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
        </Box>
    );
};

export default Menu;
