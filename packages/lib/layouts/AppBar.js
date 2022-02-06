import * as React from 'react'
import {
    makeStyles,
    Toolbar,
    useMediaQuery,
    Box,
    AppBar as MuiAppBar
} from '@material-ui/core';
// Icons
import ToggleSidebarButton from './ToggleSidebarButton';
import GoBackButton from './GoBackButton';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu'
import { MenuItemLink } from 'react-admin'
import ProfileIcon from '@approbado/lib/icons/ProfileIcon';
import LogoutButton from '@approbado/lib/components/LogoutButton'
import Typography from '@material-ui/core/Typography'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import LazyLoader from '@approbado/lib/components/LazyLoader'

const NotificationsButton = React.lazy(() => import('./NotificationsButton'))

const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: props =>
                props.isXSmall ? theme.palette.primary.main
                : theme.palette.background.default,
            width: props =>
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
            flexDirection: props =>
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

const CustomUserMenu = React.forwardRef((props, ref) => (
    <UserMenu {...props}>
        <Box>
            <MenuItemLink
                ref={ref}
                to="/profile"
                primaryText='Perfil'
                title='Configuraciones de perfil'
                leftIcon={<ProfileIcon />}
                onClick={props.onClick}
                sidebarIsOpen
            />
            <LogoutButton>
                <Typography variant="subtitle1">
                    {'Cerrar sesión'}
                </Typography>
            </LogoutButton>
        </Box>
    </UserMenu>
));

const AppBar = props => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const classes = useStyles({
        isOpenSidebar: open,
        isXSmall: isXSmall
    });
    const { user, isAuth } = useUserState();

    return (
        <MuiAppBar className={classes.root} position='absolute' {...props} title=''>
            <Toolbar
                disableGutters
                variant={isXSmall ? 'regular' : 'dense'}
                className={classes.toolbar}
            >
                <div>
                    <ToggleSidebarButton />
                    <GoBackButton />
                </div>

                <div style={{ display: 'flex' }}>
                    {(user.is_registered) && (
                        <LazyLoader loader={false}>
                            <NotificationsButton />
                        </LazyLoader>
                    )}
                    <CustomUserMenu />
                </div>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
