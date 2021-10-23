import UserList from './UserList'
import UserCreate from './UserCreate'
import UsersIcon from '@approbado/lib/icons/UsersIcon'
import UserEdit from './UserEdit'

export default {
    name: 'users',
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
    icon: UsersIcon,
    options: {
        label: 'Usuarios'
    },
}
