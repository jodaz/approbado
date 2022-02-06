import { Layout, Sidebar } from 'react-admin';
import { theme } from '@approbado/lib/styles';
import AppBar from './AppBar';
import Menu from './Menu';
import { createMuiTheme } from '@material-ui/core/styles';

const CustomSidebar = props => <Sidebar {...props} size={200} />;

export default props => {
    return (
        <Layout
        {...props}
        appBar={AppBar}
        sidebar={CustomSidebar}
        menu={Menu}
        theme={createMuiTheme(theme)}
        />
    );
};
