import {
    makeStyles,
    Toolbar,
    useMediaQuery,
    Theme,
    AppBar as MuiAppBar
} from '@material-ui/core';
import UserMenu from './UserMenu';
// Icons
import ToggleSidebarButton from './ToggleSidebarButton';
import { AppState } from '../types';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: (props: any) => 
                props.isXSmall ? theme.palette.primary.main
                : theme.palette.background.default,
            width: (props: any) => 
                !props.isOpenSidebar && (!props.isXSmall) // Large screens
                    ? `calc(100% - 55px)` 
                : (props.isXSmall) // Small screen
                    ? '100%'
                : `calc(100% - 240px)`, // Large screen
            boxShadow: 'none',
            borderBottom: 0,
            transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: 24,
            backgroundColor: 'transparent',
            flexDirection: (props: any) => 
                props.isXSmall 
                    ? 'row-reverse'
                    : 'row',
        },
        title: {
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
    }),
    { name: 'RaAppBar' }
);
  

const AppBar = (props: any) => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    const classes = useStyles({
        isOpenSidebar: open,
        isXSmall: isXSmall
    });
  
    return (
        <MuiAppBar className={classes.root} position='absolute'>
            <Toolbar
                disableGutters
                variant={isXSmall ? 'regular' : 'dense'}
                className={classes.toolbar}
            >
                <ToggleSidebarButton />

                <UserMenu />
            </Toolbar>
        </MuiAppBar>
    );
};

  export default AppBar;
  