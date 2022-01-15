import ReportsView from './ReportsView'
import { ReactComponent as InformationIcon } from '@approbado/lib/icons/Information.svg'
import ReportShow from './ReportShow'

export default {
    name: 'reports',
    list: ReportsView,
    icon: InformationIcon,
    show: ReportShow,
    options: {
        label: 'Reportes'
    },
}
