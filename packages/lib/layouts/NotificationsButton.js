import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import NotificationIcon from '@approbado/lib/icons/NotificationIcon'
import { useHistory } from 'react-router-dom'

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
}));

const NotificationsButton = () => {
    const history = useHistory();

    return (
        <Tooltip
            title='Ver notificaciones'
            enterDelay={500}
        >
            <CustomIconButton
                onClick={() => history.push('/notifications')}
            >
                <NotificationIcon />
            </CustomIconButton>
        </Tooltip>
    );
};

export default NotificationsButton;
