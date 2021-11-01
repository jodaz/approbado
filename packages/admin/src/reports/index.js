import ReportsView from './ReportsView'
import { ReactComponent as InformationIcon } from '@approbado/lib/icons/Information.svg'

export default {
    name: 'reports',
    list: ReportsView,
    icon: InformationIcon,
    options: {
        label: 'Reportes'
    },
}
