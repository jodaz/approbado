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
  
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 24,
        backgroundColor: 'transparent'
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
        },
    }),
    { name: 'RaAppBar' }
);
  

const AppBar = (props: any) => {
    const classes = useStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
      theme.breakpoints.down('xs')
    );
  
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
  