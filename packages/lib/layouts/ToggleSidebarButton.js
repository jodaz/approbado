import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import { ReactComponent as MenuIcon } from '@approbado/lib/icons/Menu.svg'
import { useUiState, useUiDispatch } from '../hooks/useUI';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
    marginLeft: '0.5rem'
}));

const ToggleSidebarButton = () => {
    const { sidebarOpen } = useUiState();
    const { toggleSidebar } = useUiDispatch()

    return (
        <Tooltip
            title={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            enterDelay={500}
        >
            <CustomIconButton
                onClick={() => toggleSidebar()}
            >
                <MenuIcon />
            </CustomIconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
