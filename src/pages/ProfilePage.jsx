import {
  Layout,
  Descriptions,
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Col,
  Row, Typography
} from "antd";

import {
  createBankAccWs,
  createBTCwalletWs,
  createETHwalletWs,
} from "../services/user-ws";
import { useNavigate, Link } from "react-router-dom";
import {
  UserOutlined,
  DollarOutlined,
  WalletOutlined,BarChartOutlined,ShoppingCartOutlined
} from "@ant-design/icons";
const {Title,Paragraph} = Typography
const { Content } = Layout;

function ProfilePage(props) {
  const noData = () => {
    return <p style={{ color: "red" }}>Aún no registras cuenta ó billetera</p>;
  };

  const buyOperations = props.user._userBuys.length;
  const sellOperations = props.user._userSells.length;
 

  const navigate = useNavigate();

  const onFinish = (values) => {
    const { bankAccount, walletBTCAddress, walletETHAddress } = values;
    if (bankAccount) {
      createBankAccWs(values).then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          console.log("data", data.user);
          Modal.success({
            content: "Todo exitoso. Se agregó la cuenta",
          });
          navigate("/profile"); //esto es para irnos al profile cuando te logeas/suscribes
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    } else if (walletBTCAddress) {
      //1B6n6MhWoCX94Yv8YC8a19SCaKEteKqEB7
      createBTCwalletWs(values).then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          console.log("data", data.user);
          Modal.success({
            content: "Todo exitoso. Se agregó la billetera BTC",
          });
          navigate("/profile"); //esto es para irnos al profile cuando te logeas/suscribes
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    } else if (walletETHAddress) {
      //0x29a3650daa254a17846538caeb25e3b0c2fbdb05
      createETHwalletWs(values).then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          console.log("data", data.user);
          Modal.success({
            content: "Todo exitoso. Se agregó la billetera ETH",
          });
          navigate("/profile"); //esto es para irnos al profile cuando te logeas/suscribes
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content className="profile-page">

      <Avatar
      style={{marginBottom:20}}
        size={150}
        src={props.user.imageUrl}
      />

<br/>

{props.user.role === "User" ? (
        
        <Button type="primary" danger >
                  <Link to="/transactions">
                    Compra o Vende Criptos! <ShoppingCartOutlined />
                  </Link></Button>
        
                
              ) : (
                <Button type="primary" danger>
                  <Link to="/admin">Administración <BarChartOutlined /></Link>
                  </Button>
              )}

      <Row gutter={[8, 8]} className="user-profile">
        <Col span={12}>
          <Descriptions bordered>
            <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Nombre">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions bordered>
            {props.user.bankAccount ? (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Cuenta Bancaria">
                {props.user.bankAccount}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Cuenta Bancaria">
                {noData()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions bordered>
            {props.user.walletBTCAddress ? (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Billetera de BTC">
                {props.user.walletBTCAddress}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Billetera de BTC">
                {noData()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions title="" bordered>
            <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Correo electrónico">
              {props.user.email}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions title="" bordered>
            <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Rol">{props.user.role}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions   bordered>
            {props.user.walletETHAddress ? (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Billetera de ETH">
                {props.user.walletETHAddress}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item labelStyle={{width:200,fontWeight:"bold"}} label="Billetera de ETH">
                {noData()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>

      </Row>

      {/* Form for creating bank account */}

      {!props.user.bankAccount ? (
        <>
          <Form
            name="bank"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agrega cuenta bancaria"
              name="bankAccount"
              rules={[
                {
                  required: true,
                  message:
                    "Porfavor ingresa la cuenta bancaria. Necesitas 14 dígitos.",
                },
              ]}
            >
              <Input prefix={<DollarOutlined />} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : null}

      {/* Form for creating BTC account*/}

      {!props.user.walletBTCAddress ? (
        <>
          <Form
            name="btc"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agrega la dirección de tu billetera que admita BTC"
              name="walletBTCAddress"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingresa la dirección de la billetera",
                },
              ]}
            >
              <Input prefix={<WalletOutlined />} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : null}

      {/* Form for creating ETH account */}

      {!props.user.walletETHAddress ? (
        <>
          <Form
            name="eth"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agrega la dirección de tu billetera que admita ETH"
              name="walletETHAddress"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingresa la dirección de la billetera",
                },
              ]}
            >
              <Input prefix={<WalletOutlined />} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : null}



<>
<Title>Mis operaciones</Title>
      

      <Paragraph>
        {" "}
        Desde que te creaste la cuenta, {props.user.firstName}, has comprado {buyOperations} veces y
        vendido {sellOperations} con nuestro servicio. Gracias por confiar en
        nosotros.
      </Paragraph>

      <Paragraph>Dale click al botón de abajo para ver todas tus operaciones.</Paragraph>

      <Button type="primary"
      >
        <Link to="/operations">
            Mira el detalle detus operaciones <BarChartOutlined />
          </Link> 
      </Button>

</>




    </Content>
  );
}

export default ProfilePage;


