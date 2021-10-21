import * as React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { MenuItemLink } from 'react-admin';

const MenuItems = ({ open, onMenuClick, dense }) => (
    <React.Fragment>
        {' '}
        <MenuItemLink
            to="/"
            primaryText={open ? 'Inicio' : <></>}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
    </React.Fragment>
);

export default MenuItems;
