import * as React from 'react'
import Box from '@material-ui/core/Box';
import LayerIcon from '@approbado/lib/icons/LayerIcon';
import { makeStyles, styled } from '@material-ui/core/styles'
import Button from '@approbado/lib/components/Button'
import Switch from '@material-ui/core/Switch';
import { history } from '@approbado/lib/providers'
import { useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import AddFriendsModal from './AddFriendsModal';

const useStyles = makeStyles(theme => ({
    test: {
        display: 'flex',
        marginBottom: '0.75rem',
        '& > :first-child': {
            display: 'flex',
            justifyContent: 'start',
            width: '3rem'
        }
    },
    link: {
        textDecoration: 'underline',
        color: theme.palette.info.main,
        cursor: 'pointer'
    }
}))

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            width: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const getMaxTime = subthemes => subthemes.map(({ duration }) => duration).reduce((a, b) => a + b, 0)

const BeforeStarting = props => {
    const { questions, selectedSubthemes, type, level } = props
    const [maxTime, setMaxTime] = React.useState(false)
    const classes = useStyles();
    const { setConfigs, startCounter } = useTriviaDispatch();

    const handleSetMaxTime = () => {
        if (!maxTime) {
            setMaxTime(getMaxTime(selectedSubthemes))
        } else {
            setMaxTime(false)
        }
    }

    const handleClick = () => {
        setConfigs({
            level: level,
            type: type,
            view: 'playing',
            duration: maxTime
        })

        if (maxTime) { startCounter(maxTime) }

        history.push('/game')
    }

    return (
        <Box
            display='flex'
            height='80%'
            width='80%'
            flexDirection='column'
            justifyContent='start'
        >
            <Box fontWeight='600' paddingBottom='2rem'>
                Antes de comenzar
            </Box>
            <Box className={classes.test}>
                <Box>
                    😎
                </Box>
                <Box>
                    Responde y demuestra lo que sabes
                </Box>
            </Box>
            <Box className={classes.test}>
                <Box>
                    <LayerIcon />
                </Box>
                <Box>
                    {`La trivia consta de ${questions.length} preguntas`}
                </Box>
            </Box>
            <AddFriendsModal />
            <Box className={classes.test}>
                <div>
                    <AntSwitch onClick={handleSetMaxTime} />
                </div>
                <Box>
                    Definir tiempo
                    {(maxTime) && (
                        <Box fontWeight={600} fontSize='0.9rem' marginTop='0.5rem'>
                            {`Tiempo asignado: ${maxTime} minutos`}
                        </Box>
                    )}
                </Box>
            </Box>
            <Box marginTop='2rem'>
                <Button unresponsive onClick={handleClick}>
                    Comenzar
                </Button>
            </Box>
        </Box>
    )
}

BeforeStarting.defaultProps = {
    questions: [1, 2, 3]
}

export default BeforeStarting
