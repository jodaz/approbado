import UserList from './UserList'
import UserCreate from './UserCreate'
import GroupIcon from '@material-ui/icons/Group'

export default {
    name: 'users',
    list: UserList,
    create: UserCreate,
    icon: GroupIcon,
    options: {
        label: 'Usuarios'
    },
}
