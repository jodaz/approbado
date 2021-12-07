import * as React from 'react'
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
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import isEmpty from 'is-empty';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: theme.palette.primary.light,
        marginRight: '1rem',
        border: `1px solid ${theme.palette.primary.main}`
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
        color: theme.palette.primary.main,
        display: 'flex',
        fontWeight: '700',
        borderRadius: '6px',
        marginTop: '0.2rem',
        padding: '0.5rem !important'
    }
}))

const initialMenuState = {
    text: 'Menú',
    picture: 'default/user.png',
}

const UserMenu= props => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [state, setState] = React.useState(initialMenuState)
    const { identity } = useGetIdentity()
    const classes = useStyles();
    const { children, logout } = props
    const open = Boolean(anchorEl)

    const handleMenu = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    if (!logout && !children) return null

    React.useEffect(() => {
        if (!isEmpty(identity)) {
            const { status, ...rest } = identity;
            let text = '';

            if (status == 0) {
                text = 0
            } else {
                text = rest.names;
            }

            setState({ text: text, ...rest })
        }
    }, [identity])

    const { picture, text } = state;

    return (
        <>
            <Tooltip title={'Menú'}>
                <IconButton
                    color="inherit"
                    onClick={handleMenu}
                    className={classes.usernameButton}
                >
                        <Avatar
                            className={classes.avatar}
                            src={`${process.env.REACT_APP_API_DOMAIN}/public/${picture}`}
                            alt={text}
                        />
                        <Typography variant="subtitle1" fontWeight='900'>
                            {text}
                        </Typography>
                        <ArrowDown />
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
        </>
    )
}

export default UserMenu
