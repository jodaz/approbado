import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core';
import TabbedList from '@approbado/lib/components/TabbedList'
import ForumList from './ForumList'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@approbado/lib/components/Button'
import { useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import ForumCreate from './ForumCreate'

const tags = [
    {
        name: 'Populares',
        pathname: 'top',
        component: <ForumList sort={{ field: 'comments', order: 'DESC' }} />
    },
    {
        name: 'Nuevos',
        pathname: 'new',
        component: <ForumList sort={{ field: 'created_at', order: 'DESC' }} />
    },
    {
        name: 'No respondidos',
        pathname: 'unanswered',
        component: <ForumList filterDefaultValues={{ unanswered: true }} />
    },
]

const ForumsView = () => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const { setDialog } = useDialogDispatch('forums.warning');

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                p={isXSmall ? '0' : '2rem 0'}
            >
                {!isXSmall && (
                    <Box>
                        <Typography variant="h5" fontWeight="900" component="h5">
                            {'Debates en Approbado'}
                        </Typography>
                    </Box>
                )}
                <Box sm='3'>
                    <Button onClick={setDialog}>
                        {'Iniciar un debate'}
                    </Button>
                </Box>
            </Box>
            <Box width={isXSmall ? '100%' : '70%'}>
                <TabbedList tags={tags} />
            </Box>
            <ForumCreate />
        </Box>
    )
}

export default ForumsView
