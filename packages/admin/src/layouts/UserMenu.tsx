import * as React from 'react'
import PropTypes from 'prop-types'
import { useGetIdentity } from 'react-admin'
import {
  Tooltip,
  IconButton,
  Popover,
  MenuList,
  Avatar,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    marginRight: '1rem',
  },
  usernameContainer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  usernameButton: {
    borderRadius: '0',
    padding: '0.2rem 1rem',
    marginRight: 0
  }
}))

const UserMenu: React.FC<any> = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { loaded, identity } = useGetIdentity()
  const classes = useStyles(props);

  const { children, icon, logout } = props
  if (!logout && !children) return null
  const open = Boolean(anchorEl)
  const handleMenu = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <Tooltip title={''}>
        <IconButton
          aria-label={''}
          aria-haspopup={true}
          color="inherit"
          onClick={handleMenu}
          size={'small'}
          className={classes.usernameButton}
        >
          {loaded && identity!.avatar ? (
            <>
              <Avatar
                className={classes.avatar}
                src={`${process.env.REACT_APP_API_DOMAIN}/`+identity!.avatar}
                alt={identity!.full_name}
              />
              <div className={classes.usernameContainer}>
                <Typography variant={'subtitle1'}>{identity!.full_name}</Typography>
                <Typography variant='subtitle2'>
                  {identity!.roles[0].name}
                </Typography>
              </div>
              <ArrowDown />
            </>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
      <Popover
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          {React.Children.map(children, (menuItem) =>
            React.cloneElement(menuItem, {
              onClick: handleClose,
            })
          )}
          {logout}
        </MenuList>
      </Popover>
    </div>
  )
}

UserMenu.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  logout: PropTypes.element,
}

UserMenu.defaultProps = {
  label: 'menu.settings',
  icon: <AccountCircle />,
}

export default UserMenu
