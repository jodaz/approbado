import {
    Datagrid,
    TextField,
    Pagination,
    FilterLiveSearch,
    ListBase,
    FilterContext,
    TopToolbar
} from 'react-admin'
import { Box } from '@material-ui/core';
import DatagridOptions from '../components/DatagridOptions';

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <DatagridOptions />
    </Datagrid>
)
const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
    </TopToolbar>
);

const RegisteredUsersList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'reference', order: 'ASC' }}
        filter={{ is_registered: true }}
        {...props}
    >
        <RegisteredUsersListView />
    </ListBase>
);

const RegisteredUsersListView = () => (
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

RegisteredUsersList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default RegisteredUsersList;
