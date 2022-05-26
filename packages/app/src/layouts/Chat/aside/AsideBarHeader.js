import * as React from 'react'
import Box from '@material-ui/core/Box';
import SearchIcon from '@approbado/lib/icons/SearchIcon'
import TextField from '@material-ui/core/TextField'

const AsideBarHeader = ({ onChange }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 0',
        width: '100%',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.18)'
    }}>
        <TextField
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <Box marginLeft='6px' display='flex'>
                        <SearchIcon />
                    </Box>
                )
            }}
            placeholder='Buscar a un usuario'
        />
    </Box>
);

export default AsideBarHeader
