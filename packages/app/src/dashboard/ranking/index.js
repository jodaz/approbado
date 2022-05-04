import * as React from 'react'
import Box from '@material-ui/core/Box'
import { axios } from '@approbado/lib/providers'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const TestList = () => {
    // const [users, setUsers] = React.useState(initialState)

    // const fetchUsers = React.useCallback(async () => {
    //     const { data } = await axios.get('/users')

    //     setNewTrivias({...data, loaded: true })
    // }, [])

    // const renderer = ({ data }) => (
    //     <Box margin='1rem 0'>
    //         {data.map((trivia, i) => (
    //             <TestCard key={i} {...trivia} />
    //         ))}
    //     </Box>
    // )

    // React.useEffect(() => {
    //     fetchUsers();
    // }, [])

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
