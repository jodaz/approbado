import ForumsView from './ForumsView'
import { ReactComponent as ForumIcon } from '@approbado/lib/icons/Forum.svg'
import ForumShow from './ForumShow'
import ForumEdit from './ForumEdit'

export default {
    name: 'forums',
    list: ForumsView,
    icon: ForumIcon,
    show: ForumShow,
    edit: ForumEdit,
    options: {
        label: 'Foro'
    },
}
