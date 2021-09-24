import {
    Datagrid,
    TextField,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
    NumberField,
    DateField
} from 'react-admin'
import Box from '@material-ui/core/Box'

const PaymentsDatagrid = () => (
    <Datagrid optimized>
        <DateField label='Fecha' source="created_at" />
        <TextField label='Método' source="payment_method" />
        <NumberField label="Precio" source="amount" />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
    </TopToolbar>
);

const PlansList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'reference', order: 'ASC' }}
        {...props}
    >
        <PlansListView />
    </ListBase>
);

const PlansListView = () => (
    <>
        <FilterContext.Provider>
            <ListActions />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <PaymentsDatagrid />
                <Pagination rowsPerPageOptions={[5, 10, 25]} />
            </Box>
        </Box>
    </>
);

PlansList.defaultProps = {
    basePath: 'memberships/payments',
    resource: 'memberships/payments'
}

export default PlansList
