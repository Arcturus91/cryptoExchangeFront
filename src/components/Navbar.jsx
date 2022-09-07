import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Navbar = ({user}) => (
  <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
  
    <Menu.Item key="login" icon={<MailOutlined />}>
      <Link to="/login">Iniciar sesión</Link> / 
    </Menu.Item>

    <Menu.Item key="signup" icon={<MailOutlined />}>
    <Link to="/signup">Regístrate</Link>
    </Menu.Item>


    {user && <Menu.SubMenu key="user" title="El usuario" icon={<SettingOutlined />}>
      <Menu.Item key="two" icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <Menu.Item key="three" icon={<AppstoreOutlined />}>
        Navigation Three
      </Menu.Item>
      <Menu.ItemGroup title="Item Group">
        <Menu.Item key="four" icon={<AppstoreOutlined />}>
          Navigation Four
        </Menu.Item>
        <Menu.Item key="five" icon={<AppstoreOutlined />}>
          Navigation Five
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>}
  </Menu>
);

export default Navbar;