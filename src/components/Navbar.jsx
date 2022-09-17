import { Menu } from "antd";
import {
  
  AppstoreOutlined,
  SmileOutlined,
  
  WalletOutlined,
  UserOutlined,
  FireOutlined,
  
  DollarOutlined,
  LaptopOutlined,ShoppingCartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => (

  <Menu className="nav-bar" mode="horizontal" defaultSelectedKeys={["mail"]}>
   
   <>

   <Menu.Item key="logo">
   <Link to="/">
   <img style={{height:50}} src="https://res.cloudinary.com/dad5dandd/image/upload/v1663191866/AlpacaExchange/alpacaLogo_gr97c6.png" alt='icon'/>

    </Link>
   </Menu.Item>

</>
<>
    {!user && 
      <>
        <Menu.Item key="login" icon={<LaptopOutlined />}>
          <Link style={{color:"white"}} to="/login">Iniciar sesión</Link> 
        </Menu.Item>

        <Menu.Item key="signup" icon={<UserOutlined />}>
          <Link style={{color:"white"}} to="/signup">Regístrate</Link>
        </Menu.Item>
      </>
    }

    {user && (
      <Menu.SubMenu key="user" title={`Bienvenido ${user.firstName} ${user.lastName}` } icon={<UserOutlined />} >
        <Menu.Item key="two" icon={<SmileOutlined />}>
        <Link to="/profile">Mi perfil</Link>
        </Menu.Item>

        {user.role === "User" ? (
        <Menu.Item key="three" icon={<ShoppingCartOutlined />}>
        <Link to="/transactions">Compra/Vende</Link>
        </Menu.Item>
        ) : null}

        <Menu.Item key="four" icon={<WalletOutlined />}>
        <Link to="/operations">Mis operaciones</Link>
        </Menu.Item>

{user.role === "Admin" ? (
  <Menu.Item key="eight" icon={<WalletOutlined />}>
        <Link to="/admin">Administración</Link>
        </Menu.Item>
) : null}

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

    

   
        <Menu.Item key="Team" icon={<LaptopOutlined />}>
          <Link style={{color:"white"}} to="/team">El equipo</Link> 
        </Menu.Item>

        <Menu.Item key="contact" icon={<UserOutlined />}>
          <Link style={{color:"white"}} to="/contact">Contacto</Link>
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
