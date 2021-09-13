import { 
    ReferenceManyField,
    Datagrid,
    TextField,
    Pagination,
    useRedirect,
    TopToolbar,
    EditButton as RaEditButton,
    DeleteButton as RaDeleteButton
} from 'react-admin'
import Button from '@material-ui/core/Button'

const EditButton = ({ record }) => (
    <RaEditButton basePath="/users" label="" record={record} />
);

const DeleteButton = ({ record }) => (
    <RaDeleteButton basePath="/users" label="" record={record} />
);

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="rol" label="Acceso" />
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <EditButton />
        <DeleteButton />
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
            filter={{ is_registered: false }}
        >
            <>
                <TopToolbar>
                    <Button onClick={() => redirect('/users/create')}>
                        Crear
                    </Button>
                </TopToolbar>
                <UsersDatagrid {...props} />
                <Pagination />
            </>
        </ReferenceManyField>
    );
}

export default UserList