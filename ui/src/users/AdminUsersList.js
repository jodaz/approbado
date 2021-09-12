import { 
    ReferenceManyField,
    Datagrid,
    TextField,
    Pagination,
    useRedirect,
    TopToolbar
} from 'react-admin'
import Button from '@material-ui/core/Button'

const UsersDatagrid = () => (
    <Datagrid optimized>
        <TextField source="access" label="Acceso" />
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
    </Datagrid>
)

const UserList = (props) => {
    const redirect = useRedirect();
    return (
        <ReferenceManyField
            addLabel={false}
            reference='users'
            target='id'
            sort={{ field: 'created_at', order: 'DESC' }}
            perPage={10}
            filter={{ access: 'MODERADOR' }}
        >
            <>
                <TopToolbar>
                    <Button onClick={() => redirect('/users/create')}>
                        Crear
                    </Button>
                </TopToolbar>
                <UsersDatagrid />
                <Pagination />
            </>
        </ReferenceManyField>
    );
}

export default UserList