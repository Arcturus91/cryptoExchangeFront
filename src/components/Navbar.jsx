import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SmileOutlined,
  SettingOutlined,
  WalletOutlined,
  UserOutlined,
  FireOutlined,
  LockOutlined,
  DollarOutlined,
  LaptopOutlined,ShoppingCartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => (
  <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
    {!user && 
      <>
        <Menu.Item key="login" icon={<LaptopOutlined />}>
          <Link to="/login">Iniciar sesión</Link> /
        </Menu.Item>

        <Menu.Item key="signup" icon={<UserOutlined />}>
          <Link to="/signup">Regístrate</Link>
        </Menu.Item>
      </>
    }

    {user && (
      <Menu.SubMenu key="user" title={`Bienvenido ${user.firstName} ${user.lastName}`} icon={<UserOutlined />}>
        <Menu.Item key="two" icon={<SmileOutlined />}>
        <Link to="/profile">Mi perfil</Link>
        </Menu.Item>

        <Menu.Item key="three" icon={<ShoppingCartOutlined />}>
        <Link to="/transactions">Compra/Vende</Link>
        </Menu.Item>
        

        <Menu.Item key="four" icon={<WalletOutlined />}>
        <Link to="/operations">Mis operaciones</Link>
        </Menu.Item>
        <Menu.ItemGroup title="Noticias financieras">
          <Menu.Item key="five" icon={<DollarOutlined />}>
          <Link to="/">Noticias de bolsa</Link>
          </Menu.Item>
          <Menu.Item key="six" icon={<FireOutlined />}>
          <Link to="/">Noticias de criptos</Link>
          </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item
            onClick={handleLogout}
            key="seven"
            icon={<AppstoreOutlined />}
          >
            Cerrar sesión
          </Menu.Item>
        
      </Menu.SubMenu>
    )}
  </Menu>
);

export default Navbar;
