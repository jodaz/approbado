import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { axios, history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { stringify } from 'qs';
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 600,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    },
    answer: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: '6px',
        margin: '1rem 0'
    },
    icon: {
        fill: theme.palette.background.default,
        marginRight: '1rem'
    }
}))

const PreparingRoom = () => {
    const { room: { loaded, ...restRoom } } = useTriviaState();
    const { setRoom } = useTriviaDispatch()
    const { token } = useParams()

    // const fetchTriviaGrupal = React.useCallback(async () => {
    //     try {
    //         const res = await axios.get(`/trivias/grupal/${token}`)

    //         setRoom(res)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if (!loaded) {
    //         fetchTriviaGrupal();
    //     }
    // }, [loaded])

    return (
        <>
            <Box>
                <Box margin='1rem 0' fontSize="2rem" fontWeight="600">
                    Preparando sala...
                </Box>
            </Box>
        </>
    )
}

export default PreparingRoom
