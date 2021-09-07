import { Layout, LayoutProps } from 'react-admin';
import Theming from './theming';
import AppBar from './AppBar';
import Menu from './Menu';
import { createMuiTheme } from '@material-ui/core/styles';

export default (props: LayoutProps) => {
  return (
    <Layout
      {...props}
      appBar={AppBar}
      menu={Menu}
      theme={createMuiTheme(Theming)}
    />
  );
};
