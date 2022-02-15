import {
    Datagrid,
    TextField,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
    NumberField,
    DateField
} from 'react-admin'
import DatagridListView from '@approbado/lib/components/DatagridListView'

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
        perPage={10}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <DatagridListView actions={<ListActions />} datagrid={<PaymentsDatagrid />} />
    </ListBase>
);

PlansList.defaultProps = {
    basePath: 'memberships/payments',
    resource: 'memberships/payments'
}

export default PlansList
