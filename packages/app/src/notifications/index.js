import NotificationsView from './NotificationsView'
import { ReactComponent as NotificationIcon } from '@approbado/lib/icons/notification.svg'

export default {
    name: 'notifications',
    list: NotificationsView,
    icon: NotificationIcon,
    options: {
        label: 'Notificaciones'
    },
}
