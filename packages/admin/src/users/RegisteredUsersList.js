import {
    Datagrid,
    TextField,
    FilterLiveSearch,
    ListBase,
    FilterContext,
    TopToolbar
} from 'react-admin'
import GoToProfileButtonLink from '../components/GoToProfileButtonLink'
import ListContainer from '../components/ListContainer'

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
        <RegisteredUsersListView />
    </ListBase>
);

const RegisteredUsersListView = () => (
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

RegisteredUsersList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default RegisteredUsersList;
