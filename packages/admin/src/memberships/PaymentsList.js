import {
    Datagrid,
    TextField,
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
    NumberField,
    DateField
} from 'react-admin'
import ListContainer from '../components/ListContainer'

const PaymentsDatagrid = () => (
    <Datagrid optimized>
        <DateField label='Fecha' source="created_at" />
        <TextField label='Tipo de pago' source="payment_method" />
        <TextField label='Email' source="user.email" />
        <TextField label='Plan' source="plan.name" />
        <NumberField label="Monto" source="amount" />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="global_search" />
    </TopToolbar>
);

const PlansList = props => (
    <ListBase
        perPage={20}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <PaymentsListView />
    </ListBase>
);

const PaymentsListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={<PaymentsDatagrid />}
    />
);

PlansList.defaultProps = {
    basePath: 'memberships/payments',
    resource: 'memberships/payments'
}

export default PlansList
