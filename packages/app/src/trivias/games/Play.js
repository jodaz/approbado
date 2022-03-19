import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ProgressBar from '../components/ProgressBar'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import AnswerPill from '../components/AnswerPill'
import OptionsForm from '../components/OptionsForm'

const useStyles = makeStyles(theme => ({
    passQuestion: {
        color: theme.palette.info.dark,
        border: `2px solid ${theme.palette.info.dark}`,
        width: 'max-content'
    }
}))

const getAnswer = (question, answers) => {
    if (!answers.length) return null;

    const answer = answers.find(({ questionID }) => questionID == question.id)

    if (!answer) return null;

    return answer
}

export default function() {
    const {
        questions,
        selected,
        currQuestion: current,
        answers,
        type
    } = useTriviaState()
    const currQuestion = questions[current]
    const [currAnswer, setCurrentAnswer] = React.useState(null)
    const [isRight, setIsRight] = React.useState(null)
    const { passQuestion, unsetAnswer } = useTriviaDispatch()
    const classes = useStyles();

    const handleNextQuestion = () => {
        passQuestion();
        unsetAnswer()
        setIsRight(null)
    }

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    React.useEffect(() => {
        const answer = getAnswer(currQuestion, answers)

        if (answer) {
            setIsRight(answer.is_right)
        }

        setCurrentAnswer(answer)
    }, [answers, currQuestion]);

    if (!selected) return null

    return (
        <Box padding='1rem'>
            <ProgressBar current={current + 1} total={questions.length} />
            <Box sx={{ fontWeight: 600, margin: '2rem 0' }}>
                {current + 1}. {currQuestion.description}
            </Box>
            <Box minHeight='10rem'>
                <OptionsForm {...currQuestion} />
            </Box>

            <Box padding='1rem 0'>
                {(isRight) ? (
                    <AnswerPill variant='success'>
                        ¡Respuesta correcta!
                    </AnswerPill>
                ) : (isRight == false) && (
                    <AnswerPill variant='danger'>
                        ¡Respuesta incorrecta!
                    </AnswerPill>
                )}
            </Box>
                <Box padding='1rem 0' minHeight='10rem'>
                    {(isRight !== null) && (
                        <>
                            {(type == 'Práctica') && (
                                <Box fontWeight={600}>
                                    Respuesta correcta: {currAnswer.correctAnswer.statement}
                                </Box>
                            )}

                            {(currQuestion.explanation_type == isRight && currQuestion.explanation) && (
                                <Box>
                                    Nota: {currQuestion.explanation}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    className={classes.passQuestion}
                    onClick={handleNextQuestion}
                    disabled={(current == questions.length || isRight != null)}
                >
                    Saltar pregunta
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    color="primary"
                    disabled={isRight == null}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    )
}
