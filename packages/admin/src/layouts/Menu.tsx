import * as React from 'react';
import ToggleSidebarButton from './ToggleSidebarButton'
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
  MenuItemLink,
  MenuProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { AppState } from '../types';
// Modules
import users from '../users';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    height: '900px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
  },
  sectionName: {
    textAlign: 'left',
    padding: '1.2em',
    color: theme.palette.primary.light,
    fontSize: '14px',
    fontWeigth: '700',
    letterSpacing: '0.2px'
  },
  menuLink: {
    color: '#FFF5F6 !important'
  }
}));

const Resources: React.FC<any> = ({
  classes,
  dense,
  onMenuClick,
}) => {
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  useSelector((state: AppState) => state.theme);

  return (
        <MenuItemLink
          className={classes.menuLink}
          to={users.name}
          primaryText={users.options.label}
          leftIcon={<users.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
  )
}

const Menu: React.FC<MenuProps> = ({ onMenuClick, dense = false }) => {
    const classes = useStyles();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  return (
    <Box className={classes.drawerPaper}>
    {' '}
      { isXSmall && <ToggleSidebarButton /> }
      <Resources classes={classes} />
    </Box>
  );
};

export default Menu;
