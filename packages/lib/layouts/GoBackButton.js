import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import { useHistory } from 'react-router-dom'

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
}));

const ToggleSidebarButton = () => {
    const history = useHistory();

    return (
        <Tooltip
            title='Regresar'
            enterDelay={500}
        >
            <CustomIconButton
                onClick={() => history.goBack()}
            >
                <LeftAngleIcon />
            </CustomIconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
