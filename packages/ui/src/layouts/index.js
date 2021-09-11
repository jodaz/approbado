import { Layout, LayoutProps, Sidebar } from 'react-admin';
import Theming from './theming';
import AppBar from './AppBar';
import Menu from './Menu';
import { createMuiTheme } from '@material-ui/core/styles';

const CustomSidebar = (props) => <Sidebar {...props} size={200} />;
  
export default (props: LayoutProps) => {
  return (
    <Layout
      {...props}
      appBar={AppBar}
      sidebar={CustomSidebar}
      menu={Menu}
      theme={createMuiTheme(Theming)}
    />
  );
};
