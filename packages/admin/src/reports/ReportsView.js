import * as React from 'react'
// Components
import RecentReports from '../components/RecentReports'
import RestrictedUsers from '../restrictedUsers'
import BlacklistedUsers from '../blacklistedUsers'
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
        name='Reportes del foro'
    />
)

export default ReportsList
