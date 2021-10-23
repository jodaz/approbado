import TriviaList from './TriviaList'
import TriviaCreate from './TriviaCreate'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
// import TriviaEdit from './TriviaEdit'

export default {
    name: 'trivias',
    list: TriviaList,
    create: TriviaCreate,
    // edit: TriviaEdit,
    icon: BalanceIcon,
    options: {
        label: 'Trivias'
    },
}
