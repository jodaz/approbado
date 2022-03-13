import * as React from 'react'
import Box from '@material-ui/core/Box'
import ProgressBar from './components/ProgressBar'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import { history } from '@approbado/lib/providers'

export default function() {
    const { questions, selected } = useTriviaState()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    return (
        <ProgressBar current={current} total={questions.length} />
    )
}
