import ReportsView from './ReportsView'
import InformationIcon from '@approbado/lib/icons/InformationIcon'
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
