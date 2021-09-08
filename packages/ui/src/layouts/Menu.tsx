import * as React from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';
import users from '../users';
import { AppState } from '../types';

const Menu: React.FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
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
