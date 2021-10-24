import * as React from 'react';
import HomeIcon from '@approbado/lib/icons/HomeIcon';
import ProfileIcon from '@approbado/lib/icons/ProfileIcon';
import SettingsIcon from '@approbado/lib/icons/SettingsIcon';
import { MenuItemLink } from 'react-admin';

const MenuItems = ({ open, onMenuClick, dense }) => (
    <React.Fragment>
        <MenuItemLink
            to="/"
            primaryText={open ? 'Inicio' : <></>}
            leftIcon={<HomeIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to="/profile"
            primaryText={open ? 'Perfil' : <></>}
            leftIcon={<ProfileIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to="/account"
            primaryText={open ? 'Configuración' : <></>}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
    </React.Fragment>
);

export default MenuItems;
