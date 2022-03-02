import Box from '@material-ui/core/Box';

export default function() {
    return (
        <Box sx={{
            bgcolor: 'background.light',
            borderRadius: '8px',
            padding: '1rem',
            borderLeft: '6px solid #2280ED',
            marginBottom: '1rem'
        }}>
            <Box sx={{ color: '#2280ED', fontWeight: 600, marginBottom: '1rem' }}>
                Actualiza tu plan!
            </Box>
            <Box>
                Estás a 3 días para que tu plan finalice. Actualiza ahora y sigue disfrutando de todos los beneficios
            </Box>
        </Box>
    )
}
