import { 
    Datagrid,
    TextField,
    EditButton,
    CreateButton,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
    NumberField,
    DeleteButton
} from 'react-admin'
import Box from '@material-ui/core/Box'

const CategoriesDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <NumberField label="Precio" source="amount" />
        <EditButton basePath='memberships/plans' />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/memberships/plans" />
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
                <CategoriesDatagrid />
                <Pagination rowsPerPageOptions={[5, 10, 25]} />
            </Box>
        </Box>
    </>
);

PlansList.defaultProps = {
    basePath: 'memberships/plans',
    resource: 'memberships/plans'
}

export default PlansList
