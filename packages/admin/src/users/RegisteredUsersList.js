import {
    Datagrid,
    TextField,
    FilterLiveSearch,
    ListBase,
    DateInput,
    TopToolbar
} from 'react-admin'
import GoToProfileButtonLink from '../components/GoToProfileButtonLink'
import DatagridListView from '@approbado/lib/components/DatagridListView'
import { Form } from 'react-final-form';

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <GoToProfileButtonLink {...props} />
    </Datagrid>
)

const ListActions = props => (
    <TopToolbar>
        <Form onSubmit={() => console.log("hello")}
            render={() => (
                <>
                    <FilterLiveSearch source="global_search" />
                    <DateInput source="created_at" />
                </>
            )}
        />
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
