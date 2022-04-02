import Box from '@material-ui/core/Box'

const TotalRights = ({ rights, total }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: '#E8E8E8',
        borderRadius: '6px',
        width: '7rem',
        margin: '0 1rem'
    }}>
        <Box fontSize='1.5rem' fontWeight='600'>{rights}/{total}</Box>
        <Box>Aciertos</Box>
    </Box>
)

TotalRights.defaultProps = {
    rights: 0,
    total: 0
}

export default TotalRights
