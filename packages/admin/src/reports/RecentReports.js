import {
    Datagrid,
    TextField,
    Pagination,
    FilterLiveSearch,
    ListBase,
    FilterContext,
    TopToolbar
} from 'react-admin'
import { Box } from '@material-ui/core';
import ReportCard from './ReportCard'

// const RegisteredUsersList = (props) => (
//     <ListBase
//         perPage={20}
//         sort={{ field: 'reference', order: 'ASC' }}
//         filter={{ is_registered: true }}
//         {...props}
//     >
//         <RegisteredUsersListView />
//     </ListBase>
// );

const RecentReports = () => (
    <ReportCard />
);

RecentReports.defaultProps = {
    basePath: 'reports',
    resource: 'reports'
}

export default RecentReports;
