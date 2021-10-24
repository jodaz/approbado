import * as React from 'react'
import PlansList from './PlansList'
import PaymentsList from './PaymentsList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Pagos',
        pathname: 'payments',
        component: <PaymentsList />
    },
    {
        name: 'Planes',
        pathname: 'plans',
        component: <PlansList />
    },
]

const Memberships = () => (
    <TabbedList
        tags={tags}
        name='Pagos y membresías'
    />
)

export default Memberships
