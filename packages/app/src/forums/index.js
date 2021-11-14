import ForumsView from './ForumsView'
import { ReactComponent as ForumIcon } from '@approbado/lib/icons/Forum.svg'

export default {
    name: 'forums',
    list: ForumsView,
    icon: ForumIcon,
    options: {
        label: 'Foro'
    },
}
