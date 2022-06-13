import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';
import { useMediaQuery } from '@material-ui/core'
import Aside from './aside'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Default from '../Default'

const tags = [
    {
        name: 'Pruebas',
        pathname: '/dashboard'
    },
    {
        name: 'Agenda',
        pathname: '/dashboard/schedules'
    },
    {
        name: 'Puntajes',
        pathname: '/dashboard/ranking'
    },
    {
        name: 'Pruebas realizadas',
        pathname: '/dashboard/completed'
    }
]

export default function Dashboard({ children }) {
    const { user, isAuth } = useUserState()
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )

    return (
        <Default>
            <Box display="flex" p={isSmall ? '0' : '2rem 0'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    <TabbedList tags={tags} name='Home' />
                    {children}
                </Box>
                {isAuth && <Aside isSmall={isSmall} user={user} />}
            </Box>
        </Default>
    )
}
