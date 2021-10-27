import TriviaList from './TriviaList'
import TriviaCreate from './TriviaCreate'
import TriviaShow from './TriviaShow'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';

export default {
    name: 'trivias',
    list: TriviaList,
    create: TriviaCreate,
    icon: BalanceIcon,
    show: TriviaShow,
    options: {
        label: 'Trivias'
    },
}
