import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';
import { ReactComponent as EditIcon } from '@approbado/lib/icons/Edit.svg'

export default function({ onClick, ...rest }) {

    return (
        <MenuItem>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px'
            }}>
                <EditIcon />
            </Box>
            Editar evento
        </MenuItem>
    );
}
