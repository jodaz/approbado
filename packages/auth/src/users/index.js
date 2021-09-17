import UserList from './UserList'
import UserCreate from './UserCreate'
import GroupIcon from '@material-ui/icons/Group'
import UserEdit from './UserEdit'

export default {
    name: 'users',
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
    icon: GroupIcon,
    options: {
        label: 'Usuarios'
    },
}
