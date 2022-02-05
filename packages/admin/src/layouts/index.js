import { Layout, Sidebar } from 'react-admin';
import { theme } from '@approbado/lib/styles';
import AppBar from '@approbado/lib/layouts/AppBar';
import Menu from '@approbado/lib/layouts/Menu';
import MenuItems from './MenuItems';
import { createMuiTheme } from '@material-ui/core/styles';
import Notification from '@approbado/lib/components/Notification'

const CustomSidebar = props => <Sidebar {...props} size={200} />;

const CustomMenu = props => (
    <Menu {...props}>
        <MenuItems />
    </Menu>
)

export default props => {
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={CustomMenu}
            theme={createMuiTheme(theme)}
            notification={Notification}
        />
    );
};
