import ForumsView from '@approbado/lib/layouts/forums/ForumsView'
import { ReactComponent as ForumIcon } from '@approbado/lib/icons/Forum.svg'
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import ForumEdit from '@approbado/lib/layouts/forums/ForumEdit'

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
