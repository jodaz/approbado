import * as React from 'react'
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const OptionsCardMenu = ({ children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Opciones">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {children}
            </Menu>
        </React.Fragment>
    );
}

export default OptionsCardMenu;
