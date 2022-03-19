import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'

const useStyles = makeStyles(theme => ({
    passQuestion: {
        color: theme.palette.info.dark,
        border: `2px solid ${theme.palette.info.dark}`,
        width: 'max-content'
    }
}))

export default function() {
    const { selected } = useTriviaState()

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    if (!selected) return null

    return (
        <Box padding='1rem'>
            <Box>
                Resumen
            </Box>
            <Box>
                Revisa tus respuestas antes de enviar <Emoji symbol='😉' />
            </Box>
        </Box>
    )
}
