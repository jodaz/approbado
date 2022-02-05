import { ListBase } from 'react-admin'
import { Box } from '@material-ui/core';
import ReportCard from './ReportCard'
import GridList from '@approbado/lib/components/GridList';
import Pagination from '@approbado/lib/components/Pagination';

const RecentReports = props => (
    <ListBase
        perPage={5}
        sort={{ field: 'created_at', order: 'DESC' }}
        {...props}
    >
        <RecentReportListView />
    </ListBase>
);

const RecentReportListView = () => (
    <Box display="flex" flexDirection="column" width='100%'>
        <GridList component={<ReportCard />} />
        <Pagination />
    </Box>
);

RecentReports.defaultProps = {
    basePath: 'reports',
    resource: 'reports'
}

export default RecentReports;
