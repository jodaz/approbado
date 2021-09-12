import { 
    ReferenceManyField,
    Datagrid,
    TextField,
    Pagination
} from 'react-admin'

const UsersDatagrid = () => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
    </Datagrid>
)

const UserList = (props) => (
    <ReferenceManyField
        addLabel={false}
        reference='users'
        target='id'
        sort={{ field: 'created_at', order: 'DESC' }}
        perPage={10}
        filter={{ access: 'CLIENTE' }}
    >
        <>
            <UsersDatagrid />
            <Pagination />
        </>
    </ReferenceManyField>
);

export default UserList