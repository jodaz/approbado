import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import { useGetResponses } from '@approbado/lib/hooks/useGetResponses'
import { ReactComponent as StateIllustration } from '@approbado/lib/illustrations/Stage1.svg'
import Button from '@approbado/lib/components/Button'
import Checkbox from '../components/Checkbox'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NoAnswer from '../components/NoAnswer'
import Points from '../components/Points'
import TotalRights from '../components/TotalRights'

const useStyles = makeStyles(theme => ({
    congratulations: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'max-content',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    button: {
        margin: '0.5rem 0'
    }
}))

export default function() {
    const { selected, trivia, questions, answers } = useTriviaState()
    const items = useGetResponses(questions, answers)
    const classes = useStyles();

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    if (!selected) return null

    return (
        <Box>
            <Box fontWeight={600} margin='2rem 0'>
                {trivia.name}
            </Box>
            <Box sx={{ display: 'flex',  width: 'max-content' }}>
                <Box className={classes.congratulations}>
                    <Box sx={{ paddingRight: '2rem' }}>
                        <StateIllustration />
                    </Box>
                    <Box>
                        <Box fontSize="1.6rem" fontWeight="600">
                            Excelente trivia!
                            <br/>
                            Sigue así <Emoji symbol='😉' />
                        </Box>
                        <Box>Sigue practicando y llegarás lejos.</Box>
                        <Button
                            className={classes.button}
                            onClick={() => history.push('/')}
                            unresponsive
                        >
                            Ir a home
                        </Button>
                    </Box>
                    <Box>
                        <Points />
                        <TotalRights />
                    </Box>
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
                        <ListItem key={item.id} dense disabled={false}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={true}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <Box sx={{ fontWeight: 600 }}>
                                {item.answer ? item.answer : <NoAnswer />}
                            </Box>
                        </ListItem>
                        {(item.explanation) && (
                            <Box sx={{ color: '#333333', fontSize: '0.9rem', padding: '1rem 0' }}>
                                Nota: {item.explanation}
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
