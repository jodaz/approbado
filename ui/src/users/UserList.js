import { 
    List,
    Datagrid,
    TextField
} from 'react-admin'

const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="names" />
            <TextField source="email" />
        </Datagrid>
    </List>
);

export default UserList