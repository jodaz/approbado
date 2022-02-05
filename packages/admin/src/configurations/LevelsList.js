import {
    Datagrid,
    TextField,
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

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

const LevelList = props => (
    <ListBase
        perPage={20}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <LevelListView />
    </ListBase>
);

const LevelListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={<LevelsDatagrid />}
    />
);

LevelList.defaultProps = {
    basePath: 'configurations/levels',
    resource: 'configurations/levels'
}

export default LevelList
