import * as React from 'react';
import {
  Tooltip,
  IconButton,
  makeStyles,
  Theme,
  useMediaQuery
} from '@material-ui/core';
import { toggleSidebar } from 'react-admin';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: (props: any) => 
          !props.isXSmall ? theme.palette.primary.main
          : theme.palette.secondary.main,
        marginLeft: '0.5em',
        marginRight: '0.5em',
    }
}));

const ToggleSidebarButton: React.FC = () => {
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    const dispatch = useDispatch();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const classes = useStyles({
        isXSmall: isXSmall
    });

    return (
        <Tooltip
            title={open ? 'Cerrar menú' : 'Abrir menú'}
            enterDelay={500}
        >
            <IconButton
                color="inherit"
                onClick={() => dispatch(toggleSidebar())}
                className={classNames(classes.menuButton)}
            >
                <MenuIcon />
            </IconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
