import Box from '@material-ui/core/Box'

const Points = ({ points }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: '#2280ED',
        borderRadius: '6px',
        width: '6rem',
        margin: '0 1rem'
    }}>
        <Box fontSize='2rem' fontWeight='600'>{points}</Box>
        <Box>Puntos</Box>
    </Box>
)

Points.defaultProps = {
    points: 0
}

export default Points
