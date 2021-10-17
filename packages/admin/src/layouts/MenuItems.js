import * as React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { MenuItemLink } from 'react-admin';
import users from '../users';
import trivias from '../trivias'

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
            to="/memberships"
            primaryText={'Planes y membresías'}
            leftIcon={<MonetizationOnIcon />}
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
    </React.Fragment>
);

export default MenuItems;
