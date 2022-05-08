import * as React from 'react';
import HomeIcon from '@approbado/lib/icons/HomeIcon';
import ProfileIcon from '@approbado/lib/icons/ProfileIcon';
import SettingsIcon from '@approbado/lib/icons/SettingsIcon';
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import MenuItemLink from '@approbado/lib/components/MenuItemLink'
import { ReactComponent as ForumIcon } from '@approbado/lib/icons/Forum.svg'
import NotificationIcon from '@approbado/lib/icons/NotificationIcon'
import MessageIcon from '@approbado/lib/icons/MessageIcon'

const MenuItems = ({ open, onMenuClick, dense }) => (
    <React.Fragment>
        <MenuItemLink
            to="/"
            primaryText='Inicio'
            leftIcon={<HomeIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to='/notifications'
            primaryText='Notificaciones'
            leftIcon={<NotificationIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to="/trivias"
            primaryText='Trivias'
            leftIcon={<BalanceIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to='/forums'
            primaryText='Foros'
            leftIcon={<ForumIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to='/messages'
            primaryText='Mensajería'
            leftIcon={<MessageIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to="/profile"
            primaryText='Perfil'
            leftIcon={<ProfileIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to="/account"
            primaryText='Configuraciones'
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
    </React.Fragment>
);

export default MenuItems;
