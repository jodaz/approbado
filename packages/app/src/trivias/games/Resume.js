import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import Button from '@approbado/lib/components/Button'
import { useGetResponses } from '@approbado/lib/hooks/useGetResponses'
import NoAnswer from '../components/NoAnswer'
import makeStyles from '@material-ui/styles/makeStyles'
import ListItem from '@material-ui/core/ListItem';
import SelectIcon from '@approbado/lib/icons/SelectIcon'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 600,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    }
}))

export default function() {
    const classes = useStyles();
    const { selected, answers, questions, configs } = useTriviaState()
    const { setConfigs } = useTriviaDispatch()
    const items = useGetResponses(questions, answers)

    const handleClick = () => {
        setConfigs({
            ...configs,
            view: 'finished'
        })
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
                <Box className={classes.header}>
                    <Box>
                        Revisa tus respuestas antes de enviar <Emoji symbol='😉' />
                    </Box>
                    <Button onClick={handleClick} unresponsive>
                        Enviar
                    </Button>
                </Box>
            </Box>
            <Box margin='1rem 0 4rem 0'>
                {items.map((item, index) => (
                    <Box sx={{
                        borderBottom: '1px solid #A6A6A6',
                        padding: '1rem 0'
                    }} key={index}>
                        <Box fontWeight='600' margin='1rem 0'>
                            {`${index + 1}. ${item.description}`}
                        </Box>
                        <Box paddingBottom='1rem'>
                            <SelectIcon />
                            {item.answer ? item.answer : <NoAnswer />}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}
