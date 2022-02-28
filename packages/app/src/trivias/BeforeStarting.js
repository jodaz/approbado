import * as React from 'react'
import Box from '@material-ui/core/Box';
import LayerIcon from '@approbado/lib/icons/LayerIcon';
import { makeStyles, styled } from '@material-ui/core/styles'
import Button from '@approbado/lib/components/Button'
import { ReactComponent as PlusCircleIcon } from '@approbado/lib/icons/PlusCircle.svg'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

const BeforeStarting = () => {
    const [addFriends, setAddFriends] = React.useState(false)
    const [maxTime, setMaxTime] = React.useState(false)
    const classes = useStyles();

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
                    La trivia consta de 16 preguntas
                </Box>
            </Box>
            <Box className={classes.test}>
                <Box>
                    <PlusCircleIcon />
                </Box>
                <Box className={classes.link} onClick={() => setAddFriends(!addFriends)}>
                    Agregar amigos
                </Box>
            </Box>
            <Box className={classes.test}>
                <div>
                    <AntSwitch onClick={() => setMaxTime(!maxTime)} />
                </div>
                <Box>
                    Definir tiempo
                    {(maxTime) && (
                        <Box fontWeight={600} fontSize='0.9rem' marginTop='0.5rem'>
                            Tiempo asignado: 24 minutos
                        </Box>
                    )}
                </Box>
            </Box>
            <Box marginTop='2rem'>
                <Button>
                    Comenzar
                </Button>
            </Box>
        </Box>
    )
}

export default BeforeStarting
