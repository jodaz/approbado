import * as React from 'react';
import UserMenu from './UserMenu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { MenuItemLink, useLogout, useDataProvider } from 'react-admin';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  MenuItemLink: {
    color: theme.palette.primary.dark
  }
}));

const ConfigurationsButtonLink = React.forwardRef<any, any>((props, ref) => {
  return (
    <MenuItemLink
      ref={ref}
      to="/profile"
      primaryText={"Mi cuenta"}
      onClick={props.onClick}
      sidebarIsOpen
      className={props.classes}
      {...props}
    />
  );
});

const LogoutButtom = React.forwardRef((props, ref) => {
  const logout = useLogout();
  const dataProvider = useDataProvider();

  const handleClick = async () => {
    try {
      const res = await dataProvider.get('tokens/revoke');

      if (res) { await logout(); }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MenuItem
      onClick={handleClick}
    >
      <ExitIcon />{' '}Cerrar sesión
    </MenuItem>
  );
});

const UniversalUserMenu: React.FC<any> = (rest) => {
  const classes = useStyles();

  return (
    <UserMenu {...rest} label='Menú' logout={<LogoutButtom />}>
      <ConfigurationsButtonLink {...rest} classes={classes.MenuItemLink} />
    </UserMenu>
  );
}

export default UniversalUserMenu;
