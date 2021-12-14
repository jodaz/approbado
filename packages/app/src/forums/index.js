import ForumsView from './ForumsView'
import { ReactComponent as ForumIcon } from '@approbado/lib/icons/Forum.svg'
import ForumShow from './ForumShow'

export default {
    name: 'forums',
    list: ForumsView,
    icon: ForumIcon,
    show: ForumShow,
    options: {
        label: 'Foro'
    },
}
