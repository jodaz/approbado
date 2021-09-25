import {
    Datagrid,
    TextField,
    CreateButton,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin'
import Box from '@material-ui/core/Box'
import DatagridOptions from '../components/DatagridOptions';

const CategoriesDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <DatagridOptions basePath='configurations/levels' />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/configurations/levels" />
    </TopToolbar>
);

const LevelList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'reference', order: 'ASC' }}
        {...props}
    >
        <LevelListView />
    </ListBase>
);

const LevelListView = () => (
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

LevelList.defaultProps = {
    basePath: 'configurations/levels',
    resource: 'configurations/levels'
}

export default LevelList
