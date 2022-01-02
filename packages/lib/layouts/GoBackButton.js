import * as React from 'react';
import {
    Tooltip,
    IconButton,
    makeStyles
} from '@material-ui/core';
import classNames from 'classnames';
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: `${theme.palette.primary.main} !important`,
        paddingLeft: '0.55em'
    }
}));

const ToggleSidebarButton = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Tooltip
            title='Regresar'
            enterDelay={500}
        >
            <IconButton
                color="inherit"
                onClick={() => history.goBack()}
                className={classNames(classes.menuButton)}
            >
                <LeftAngleIcon />
            </IconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
