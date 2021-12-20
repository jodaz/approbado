import * as React from 'react';
import HomeIcon from '@approbado/lib/icons/HomeIcon';
import ProfileIcon from '@approbado/lib/icons/ProfileIcon';
import SettingsIcon from '@approbado/lib/icons/SettingsIcon';
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import MenuItemLink from '@approbado/lib/components/MenuItemLink'

// Other resources
import forums from '../forums'
import notifications from '../notifications'

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
            to='/notifications'
            primaryText={notifications.options.label}
            leftIcon={<notifications.icon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to="/trivias"
            primaryText={open ? 'Trivias' : ''}
            leftIcon={<BalanceIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to='/forums'
            primaryText={forums.options.label}
            leftIcon={<forums.icon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
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
            primaryText={open ? 'Configuración' : ''}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
    </React.Fragment>
);

export default MenuItems;
