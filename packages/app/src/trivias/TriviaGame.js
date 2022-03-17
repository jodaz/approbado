import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ProgressBar from './components/ProgressBar'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import AnswerPill from './components/AnswerPill'

const useStyles = makeStyles(theme => ({
    passQuestion: {
        color: theme.palette.info.dark,
        border: `2px solid ${theme.palette.info.dark}`,
        width: 'max-content'
    }
}))

export default function() {
    const { questions, selected, currQuestion: current } = useTriviaState()
    const { passQuestion } = useTriviaDispatch()
    const classes = useStyles();

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    if (!selected) return null

    return (
        <>
            <ProgressBar current={current + 1} total={questions.length} />
            <Box sx={{ fontWeight: 600, margin: '2rem 0' }}>
                {current + 1}. {questions[current].description}
            </Box>
            <AnswerPill variant='success'>
                ¡Respuesta correcta!
            </AnswerPill>
            <AnswerPill variant='danger'>
                ¡Respuesta incorrecta!
            </AnswerPill>

            {(questions[current].explanation) && (
                <Box padding='1rem 0'>
                    Nota: {questions[current].explanation}
                </Box>
            )}
            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    className={classes.passQuestion}
                    onClick={() => passQuestion()}
                    disabled={current == questions.length}
                >
                    Saltar pregunta
                </Button>
                <Button
                    variant="contained"
                    onClick={() => passQuestion()}
                    color="primary"
                >
                    Siguiente
                </Button>
            </Box>
        </>
    )
}
