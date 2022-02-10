import {
    Datagrid,
    TextField,
    FilterLiveSearch,
    ListBase,
    FilterContext,
    TopToolbar
} from 'react-admin'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const UsersDatagrid = () => (
    <Datagrid optimized>
        <TextField source="rol" label="Acceso" />
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <DatagridOptions
            basePath='users'
            confirmTitle='Eliminar usuario'
            confirmContent='¿Está seguro que desea eliminar este usuario?'
        />
    </Datagrid>
)

const ListActions = props => {
    console.log(props);

    return (
        <TopToolbar>
            <FilterLiveSearch source="global_search" {...props} />
            <CreateButton basePath="/users" />
        </TopToolbar>
    );
}

const ModeratorsList = props => (
    <ListBase
        perPage={15}
        sort={{ field: 'created_at', order: 'ASC' }}
        filter={{ is_registered: false }}
        {...props}
    >
        <ModeratorsListView />
    </ListBase>
);

const ModeratorsListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={
            <UsersDatagrid />
        }
    />
);

ModeratorsList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default ModeratorsList;
