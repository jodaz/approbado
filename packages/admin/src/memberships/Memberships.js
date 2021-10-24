import * as React from 'react'
import PlansList from './PlansList'
import PaymentsList from './PaymentsList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = ['Pagos', 'Planes'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'Planes') {
        return <PlansList />
    } else if (currentTab === 'Pagos') {
        return <PaymentsList />
    }
    return null;
}

const Memberships = () => (
    <TabbedList
        tags={tags}
        defaultTag='Pagos'
        name='Pagos y membresías'
    >
        <RenderList />
    </TabbedList>
)

export default Memberships
