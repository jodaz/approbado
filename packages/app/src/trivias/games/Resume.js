import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import Button from '@approbado/lib/components/Button'
import { useGetResponses } from '@approbado/lib/hooks/useGetResponses'
import NoAnswer from '../components/NoAnswer'

export default function() {
    const { selected, answers, questions, configs } = useTriviaState()
    const { setConfigs, getResults } = useTriviaDispatch()
    const items = useGetResponses(questions, answers)

    const handleClick = () => {
        setConfigs({
            ...configs,
            view: 'finished'
        })
        getResults()
    }

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    if (!selected) return null

    return (
        <>
            <Box>
                <Box margin='1rem 0' fontSize="2rem" fontWeight="600">
                    Resumen
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 600
                }}>
                    <Box>
                        Revisa tus respuestas antes de enviar <Emoji symbol='😉' />
                    </Box>
                    <Button onClick={handleClick}>
                        Enviar
                    </Button>
                </Box>
            </Box>
            <Box margin='1rem 0 4rem 0'>
                {items.map((item, index) => (
                    <Box sx={{
                        borderBottom: '1px solid #A6A6A6',
                        padding: '1rem 0'
                    }}>
                        <Box fontWeight='600' margin='1rem 0'>
                            {`${index + 1}. ${item.description}`}
                        </Box>
                        <Box paddingBottom='1rem'>
                            {item.answer ? item.answer : <NoAnswer />}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}
