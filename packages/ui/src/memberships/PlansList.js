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
import GridList from './GridList'

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
                <GridList />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

PlansList.defaultProps = {
    basePath: 'memberships/plans',
    resource: 'memberships/plans'
}

export default PlansList
