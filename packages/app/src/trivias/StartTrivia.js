import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import ItemCollection from '@approbado/lib/components/ItemCollection';
import Button from '@material-ui/core/Button';
import StartTriviaSelector from './StartTriviaSelector'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem'
    },
    content: {
        width: '100%',
        display: 'flex',
        paddingLeft: '1rem',
        paddingTop: '0.2rem',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem',
        color: theme.palette.info.main,
        paddingBottom: '1rem'
    },
    triviaInformation: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'max-content',
        alignItems: 'center'
    },
    button: {
        width: '10rem',
        color: '#6D6D6D',
        border: '2px solid #6D6D6D',
        marginRight: '2rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start',
        paddingTop: '1rem',
    }
}))

const sampleItems = [
    { name: 'Tema en específico #1' },
    { name: 'Tema en específico #2' },
    { name: 'Tema en específico #2' },
    { name: 'Tema en específico #2' },
    { name: 'Tema en específico #2' },
];

const StartTrivia = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs='12' md='6'>
                <Box component="div">
                    <Typography component='h6' className={classes.title}>
                        Genial! Estas a punto de iniciar una trivia
                    </Typography>
                    <Box className={classes.triviaInformation}>
                        <BalanceIcon />
                        &nbsp;
                        <Typography variant='subtitle1'>Derecho Laboral</Typography>
                    </Box>
                    <Box className={classes.triviaInformation}>
                        <Typography variant='subtitle1'>Tema: </Typography>&nbsp;
                        <Box>
                            <ItemCollection items={sampleItems} />
                        </Box>
                    </Box>
                    <Box paddingTop='2rem' paddingBottom='2rem'>
                        <Box fontWeight='600' fontSize='1.1rem'>
                            Seleccione un nivel
                        </Box>
                        <Box className={classes.buttonContainer}>
                            <Button className={classes.button}>
                                Básico
                            </Button>
                            <Button className={classes.button}>
                                Intermedio
                            </Button>
                            <Button className={classes.button}>
                                Avanzado
                            </Button>
                        </Box>
                    </Box>
                    <Box paddingTop='2rem' paddingBottom='2rem'>
                        <Box fontWeight='600' fontSize='1.1rem'>
                            Seleccione un tipo
                        </Box>
                        <Box className={classes.buttonContainer}>
                            <Button className={classes.button}>
                                Práctica
                            </Button>
                            <Button className={classes.button}>
                                Reto
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs='12' md='6'>
                <StartTriviaSelector />
            </Grid>
        </Grid>
    )
}

export default StartTrivia;
