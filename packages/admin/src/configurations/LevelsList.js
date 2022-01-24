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

const LevelsDatagrid = () => (
    <Datagrid optimized>
        <TextField label='#ID' source="id" />
        <TextField label='Nombre' source="name" />
        <DatagridOptions
            basePath='configurations/levels'
            confirmTitle='Eliminar nivel'
            confirmContent='¿Está seguro que desea eliminar este nivel?'
        />
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
        sort={{ field: 'created_at', order: 'ASC' }}
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
                <LevelsDatagrid />
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
