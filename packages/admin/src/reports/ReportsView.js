import * as React from 'react'
// Components
import RecentReports from './RecentReports'
import RestrictedUsers from './RestrictedUsers'
import BlacklistedUsers from './BlacklistedUsers'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Nuevos',
        pathname: 'recent',
        component: <RecentReports />
    },
    {
        name: 'Lista negra',
        pathname: 'blacklisted',
        component: <BlacklistedUsers />
    },
    {
        name: 'Restringidos',
        pathname: 'restricted',
        component: <RestrictedUsers />
    },
]

const ReportsList = () => (
    <TabbedList
        tags={tags}
        name='Reportes'
    />
)

export default ReportsList
