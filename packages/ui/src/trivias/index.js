import TriviaList from './TriviaList'
import TriviaCreate from './TriviaCreate'
import GroupIcon from '@material-ui/icons/Group'
// import TriviaEdit from './TriviaEdit'

export default {
    name: 'trivias',
    list: TriviaList,
    create: TriviaCreate,
    // edit: TriviaEdit,
    icon: GroupIcon,
    options: {
        label: 'Trivias'
    },
}
