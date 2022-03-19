import * as React from 'react'
import LazyLoader from '@approbado/lib/components/LazyLoader'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'

const PlayTriviaGame = React.lazy(() => import('./Play'))
const ResumeTriviaGame = React.lazy(() => import('./Resume'))
const FinishedTriviaGame = React.lazy(() => import('./Finished'))

export default function() {
    const state = useTriviaState();

    return (
        <LazyLoader>
            <PlayTriviaGame />
        </LazyLoader>
    )
}
