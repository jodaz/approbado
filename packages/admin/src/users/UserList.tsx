import { 
    List,
    Datagrid,
    TextField,
    ListProps
} from 'react-admin'

const UserList = (props: ListProps) => (
    <List {...props}>
        <Datagrid>
            <TextField source="names" />
            <TextField source="email" />
        </Datagrid>
    </List>
);

export default UserList