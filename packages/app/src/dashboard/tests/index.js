import Box from '@material-ui/core/Box'
import TestCard from './TestCard'

const TestList = () => (
    <Box display='flex' flexDirection='column'>
        <Box marginBottom='1rem'>
            <Box component='strong'>
                Continúa con tu prueba
            </Box>
            <Box margin='1rem 0'>
                <TestCard />
            </Box>
        </Box>
        <Box marginBottom='1rem'>
            <Box component='strong'>
                Pruebas dificiles - Estas listo? 🔥
            </Box>
            <Box margin='1rem 0'>
                <TestCard />
            </Box>
        </Box>
        <Box marginBottom='1rem'>
            <Box component='strong'>
                Pruebas populares
            </Box>
            <Box margin='1rem 0'>
                <TestCard />
            </Box>
        </Box>
    </Box>
)

export default TestList
