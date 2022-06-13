import * as React from 'react'
import Box from '@material-ui/core/Box'
import { axios } from '@approbado/lib/providers'
// Components
import TestCard from './TestCard'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const TestList = () => {
    const [popularTrivias, setPopularTrivias] = React.useState(initialState)
    const [newTrivias, setNewTrivias] = React.useState(initialState)

    const fetchTrivias = React.useCallback(async () => {
        const { data } = await axios.get('/trivias/plans')

        setNewTrivias({...data, loaded: true })
    }, [])

    const fetchPopularTrivias = React.useCallback(async () => {
        const { data } = await axios.get('/trivias/plans?filter%5Btop%5D=true')

        setPopularTrivias({...data, loaded: true })
    }, [])

    const renderer = ({ data }) => (
        <Box margin='1rem 0'>
            {data.map((trivia, i) => (
                <TestCard key={i} {...trivia} />
            ))}
        </Box>
    )

    React.useEffect(() => {
        fetchTrivias();
        fetchPopularTrivias();
    }, [])

    return (
        <Box display='flex' flexDirection='column'>
            {(newTrivias.loaded) && (
                <Box marginBottom='1rem'>
                    <Box component='strong'>
                        Continúa con tu prueba
                    </Box>
                    {renderer(newTrivias)}
                </Box>
            )}
            {(popularTrivias.loaded) && (
                <Box marginBottom='1rem'>
                    <Box component='strong'>
                    Pruebas populares - Estas listo? 🔥
                    </Box>
                    {renderer(popularTrivias)}
                </Box>
            )}
        </Box>
    )
}

export default TestList
