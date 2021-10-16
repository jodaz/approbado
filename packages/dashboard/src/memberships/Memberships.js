import * as React from 'react'
import PlansList from './PlansList'
import PaymentsList from './PaymentsList'
import TabbedList from '../components/TabbedList'

const tags = ['pagos', 'planes'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'planes') {
        return <PlansList />
    } else if (currentTab === 'pagos') {
        return <PaymentsList />
    }
    return null;
}

const Memberships = () => (
    <TabbedList
        tags={tags}
        defaultTag='pagos'
        name='Pagos y membresías'
    >
        <RenderList />
    </TabbedList>
)

export default Memberships
