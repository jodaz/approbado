import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core'
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@approbado/lib/components/Button'
import { useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import ForumCreate from './ForumCreate'
import TopContributors from './TopContributors'
import ForumsListView from '@approbado/lib/layouts/forums/ForumsListView'
import ForumWarning from './ForumWarning'

const tags = [
    {
        name: 'Populares',
        pathname: 'top',
        component: <ForumsListView perPage='5' sort={{ field: 'comments', order: 'DESC' }} />
    },
    {
        name: 'Nuevos',
        pathname: 'new',
        component: <ForumsListView perPage='5' sort={{ field: 'created_at', order: 'DESC' }} />
    },
    {
        name: 'No respondidos',
        pathname: 'unanswered',
        component: <ForumsListView perPage='5' filter={{ unanswered: true }} />
    },
]

const ForumsView = () => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )
    const { setDialog } = useDialogDispatch('forums.warning')

    return (
        <Box display="flex" p={isXSmall ? '0' : '2rem 0'}>
            <Box width='100%' p='0 2rem 0 0'>
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    {!isXSmall && (
                        <Typography component="div">
                            <Box sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
                                {'Debates en Approbado'}
                            </Box>
                        </Typography>
                    )}
                    <Box sm='3'>
                        <Button onClick={setDialog}>
                            {'Iniciar un debate'}
                        </Button>
                    </Box>
                </Box>
                <TabbedList tags={tags} />
            </Box>
            <TopContributors isXSmall={isXSmall} />
            <ForumCreate />
            <ForumWarning />
        </Box>
    )
}

export default ForumsView
