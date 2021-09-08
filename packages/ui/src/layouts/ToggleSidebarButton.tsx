import * as React from 'react';
import {
  Tooltip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { toggleSidebar } from 'react-admin';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';

const useStyles = makeStyles(theme => ({
  menuButton: {
    color: theme.palette.primary.main,
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(0deg)',
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(180deg)',
  },
}));

const ToggleSidebarButton: React.FC = () => {
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Tooltip
      title={'Abrir/Cerrar menu'}
      enterDelay={500}
    >
      <IconButton
        color="inherit"
        onClick={() => dispatch(toggleSidebar())}
        className={classNames(classes.menuButton)}
      >
        <MenuIcon
          classes={{
            root: open
              ? classes.menuButtonIconOpen
              : classes.menuButtonIconClosed,
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default ToggleSidebarButton;
