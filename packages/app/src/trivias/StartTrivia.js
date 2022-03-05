import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import ItemCollection from '@approbado/lib/components/ItemCollection';
import Button from '@material-ui/core/Button';
import StartTriviaSelector from './StartTriviaSelector'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import { Query } from 'react-admin'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'

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
        color: theme.palette.primary.main,
        border: '2px solid #6D6D6D',
        marginRight: '2rem',
    },
    selectedButton: {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.secondary.main}`,
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.main, 0.9)
        }
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start',
        paddingTop: '1rem',
    }
}))

const payload = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'created_at', order: 'DESC'}
};

const StartTrivia = () => {
    const classes = useStyles();
    const [level, setLevel] = React.useState('');
    const [type, setType] = React.useState('');
    const state = useTriviaState()

    React.useEffect(() => {
        if (!state.selected) {
            history.push('/trivias');
        }
    }, [state])

    const { selectedSubthemes, trivia } = state

    return (
        <Grid container>
            <Grid item xs>
                <Typography component='h6' className={classes.title}>
                    Genial! Estas a punto de iniciar una trivia
                </Typography>
                <Box className={classes.triviaInformation}>
                    <BalanceIcon />
                    &nbsp;
                    <Typography variant='subtitle1'>{trivia.name}</Typography>
                </Box>
                <Box className={classes.triviaInformation}>
                    <Typography variant='subtitle1'>Tema: </Typography>&nbsp;
                    <Box>
                        <ItemCollection items={selectedSubthemes} />
                    </Box>
                </Box>
            </Grid>
            <Grid item md={3}>
                <Divider orientation='horizontal'  />
            </Grid>
            <Grid container>
                <Grid item xs>
                    <Box paddingTop='2rem' paddingBottom='2rem'>
                        <Box fontWeight='600' fontSize='1.1rem'>
                            Selecciona un nivel
                        </Box>
                        <Query type='getList' resource='configurations/levels' payload={payload}>
                            {({ data, total, loading, error }) => {
                                if (loading) return null;
                                if (error) return null
                                if (total == 0) return null;

                                return (
                                    <Box className={classes.buttonContainer}>
                                        {data.map(item =>
                                            <Button
                                                className={clsx(classes.button, (item.name == level) && classes.selectedButton)}
                                                onClick={e => setLevel(e.currentTarget.innerText)}
                                            >
                                                {item.name}
                                            </Button>
                                        )}
                                    </Box>
                                );
                            }}
                        </Query>
                    </Box>
                    <Box paddingTop='2rem' paddingBottom='2rem'>
                        <Box fontWeight='600' fontSize='1.1rem'>
                            Selecciona un tipo
                        </Box>
                        <Box className={classes.buttonContainer} marginBottom='1rem'>
                            <Button
                                className={clsx(classes.button, ('Práctica' == type) && classes.selectedButton)}
                                onClick={e => setType(e.currentTarget.innerText)}
                            >
                                Práctica
                            </Button>
                            <Button
                                className={clsx(classes.button, ('Reto' == type) && classes.selectedButton)}
                                onClick={e => setType(e.currentTarget.innerText)}
                            >
                                Reto
                            </Button>
                        </Box>
                        {(type == 'Práctica') && (
                            <Typography variant='subtitle2'>
                                *Este tipo de trivia es exploratoria.
                                Contestarás las preguntas y podrás visualizar las respuestas en el momento.
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Divider orientation='vertical' />
                <Grid item xs>
                    <StartTriviaSelector level={level} type={type} {...state} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StartTrivia;
