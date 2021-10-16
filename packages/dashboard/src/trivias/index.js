import TriviaList from './TriviaList'
import TriviaCreate from './TriviaCreate'
import GavelIcon from '@material-ui/icons/Gavel';
// import TriviaEdit from './TriviaEdit'

export default {
    name: 'trivias',
    list: TriviaList,
    create: TriviaCreate,
    // edit: TriviaEdit,
    icon: GavelIcon,
    options: {
        label: 'Trivias'
    },
}
