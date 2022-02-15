import {
    Datagrid,
    TextField,
    FilterLiveSearch,
    ListBase,
    TopToolbar
} from 'react-admin'
import GoToProfileButtonLink from '../components/GoToProfileButtonLink'
import DatagridListView from '@approbado/lib/components/DatagridListView'

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <GoToProfileButtonLink {...props} />
    </Datagrid>
)

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="global_search" />
    </TopToolbar>
);

const RegisteredUsersList = props => (
    <ListBase
        perPage={15}
        sort={{ field: 'created_at', order: 'ASC' }}
        filter={{ is_registered: true }}
        {...props}
    >
        <DatagridListView actions={<ListActions />} datagrid={<UsersDatagrid />} />
    </ListBase>
);

RegisteredUsersList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default RegisteredUsersList;
