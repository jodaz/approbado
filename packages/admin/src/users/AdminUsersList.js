import {
    Datagrid,
    TextField,
    Pagination,
    FilterLiveSearch,
    ListBase,
    FilterContext,
    TopToolbar
} from 'react-admin'
import Box from '@material-ui/core/Box';
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'

const UsersDatagrid = props => (
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
const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/users" />
    </TopToolbar>
);

const ModeratorsList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'created_at', order: 'ASC' }}
        filter={{ is_registered: false }}
        {...props}
    >
        <ModeratorsListView />
    </ListBase>
);

const ModeratorsListView = () => (
    <>
        <FilterContext.Provider>
            <ListActions />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <UsersDatagrid />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

ModeratorsList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default ModeratorsList;
