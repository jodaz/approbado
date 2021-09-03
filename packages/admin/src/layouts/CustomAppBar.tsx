import { SkipNavigationButton } from 'react-admin';
import {
  AppBar as MuiAppBar,
  makeStyles,
  Toolbar,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import UniversalUserMenu from './UniversalUserMenu';
// Icons
import ToggleSidebarButton from './ToggleSidebarButton';

const useStyles = makeStyles(theme => ({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 24,
    },
    backButton: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: '260px'
      }
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

const CustomAppBar = (props: any) => {
  const { className } = props;
  const classes = useStyles(props);
  const isXSmall = useMediaQuery<Theme>(theme =>
    theme.breakpoints.down('xs')
  );

  return (
    <MuiAppBar className={className} position='absolute'>
      <Toolbar
        disableGutters
        variant={isXSmall ? 'regular' : 'dense'}
        className={classes.toolbar}
      >
        { isXSmall && <ToggleSidebarButton /> }
        { !isXSmall &&
          <div className={classes.backButton}>
            <SkipNavigationButton />
          </div>
        }

        {/** Custom user menu */}
        <UniversalUserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default CustomAppBar;
