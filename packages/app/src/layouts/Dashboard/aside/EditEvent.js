import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';
import { ReactComponent as EditIcon } from '@approbado/lib/icons/Edit.svg'
import { useHistory } from 'react-router-dom'

export default function({ id }) {
    const history = useHistory();

    const redirect = () => history.push(`/dashboard/schedules/${id}`)

    return (
        <MenuItem onClick={redirect}>
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
