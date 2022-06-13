import * as React from 'react'
import Admin from '../layouts/Admin'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Pagos',
        pathname: '/memberships/payments'
    },
    {
        name: 'Planes',
        pathname: '/memberships/plans'
    },
]

const Memberships = ({ children }) => (
    <Admin>
        <TabbedList
            tags={tags}
            name='Pagos y membresías'
        />
        {children}
    </Admin>
)

export default Memberships
