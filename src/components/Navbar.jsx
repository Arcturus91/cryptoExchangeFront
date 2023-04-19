import { Menu } from "antd";
import {
  AppstoreOutlined,
  SmileOutlined,
  WalletOutlined,
  UserOutlined,
  FireOutlined,
  DollarOutlined,
  LaptopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => (
  <Menu className="nav-bar" mode="horizontal" defaultSelectedKeys={["mail"]}>
    <>
      <Menu.Item key="logo">
        <Link to="/">
          <img
            style={{ height: 50 }}
            src="https://res.cloudinary.com/dad5dandd/image/upload/v1663191866/AlpacaExchange/alpacaLogo_gr97c6.png"
            alt="icon"
          />
        </Link>
      </Menu.Item>
    </>
    <>
      {!user && (
        <>
          <Menu.Item key="login" icon={<LaptopOutlined />}>
            <Link style={{ color: "white" }} to="/login">
              Sign up
            </Link>
          </Menu.Item>

          <Menu.Item key="signup" icon={<UserOutlined />}>
            <Link style={{ color: "white" }} to="/signup">
              Register
            </Link>
          </Menu.Item>
        </>
      )}

      {user && (
        <Menu.SubMenu
          key="user"
          title={`Bienvenido ${user.firstName} ${user.lastName}`}
          icon={<UserOutlined />}
        >
          <Menu.Item key="two" icon={<SmileOutlined />}>
            <Link to="/profile">My profile</Link>
          </Menu.Item>

          {user.role === "User" ? (
            <Menu.Item key="three" icon={<ShoppingCartOutlined />}>
              <Link to="/transactions">Buy / Sell</Link>
            </Menu.Item>
          ) : null}

          <Menu.Item key="four" icon={<WalletOutlined />}>
            <Link to="/operations">My operations</Link>
          </Menu.Item>

          {user.role === "Admin" ? (
            <Menu.Item key="eight" icon={<WalletOutlined />}>
              <Link to="/admin">Administrator</Link>
            </Menu.Item>
          ) : null}

          <Menu.ItemGroup title="Noticias financieras">
            <Menu.Item key="five" icon={<DollarOutlined />}>
              <Link to="/">Crypto News</Link>
            </Menu.Item>
            <Menu.Item key="six" icon={<FireOutlined />}>
              <Link to="/">Crypto News</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item
            onClick={handleLogout}
            key="seven"
            icon={<AppstoreOutlined />}
          >
            Log out
          </Menu.Item>
        </Menu.SubMenu>
      )}

      <Menu.Item key="Team" icon={<LaptopOutlined />}>
        <Link style={{ color: "white" }} to="/team">
          About Us
        </Link>
      </Menu.Item>

      <Menu.Item key="contact" icon={<UserOutlined />}>
        <Link style={{ color: "white" }} to="/education">
          Crypto Education
        </Link>
      </Menu.Item>
    </>
  </Menu>
);

export default Navbar;

/* <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row> */
