import * as React from 'react'
// Components
import Admin from '../layouts/Admin'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Nuevos',
        pathname: 'recent'
    },
    {
        name: 'Lista negra',
        pathname: 'blacklisted'
    },
    {
        name: 'Restringidos',
        pathname: 'restricted'
    },
]

const ReportsList = ({ children }) => (
    <Admin>
        <TabbedList
            tags={tags}
            name='Reportes del foro'
        />
        {children}
    </Admin>
)

export default ReportsList
