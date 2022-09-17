import {
  Layout,
  Descriptions,
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Col,
  Row,
  Typography,
  Divider,
} from "antd";

import {
  createBankAccWs,
  createBTCwalletWs,
  createETHwalletWs,
  getProfileWs,
} from "../services/user-ws";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  DollarOutlined,
  WalletOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,UpOutlined,DownOutlined
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;
const { Content } = Layout;


function ProfilePage(props) {
  const [expandBank, setExpandBank] = useState(false)
  const [expandETH, setExpandETH] = useState(false)
  const [expandBTC, setExpandBTC] = useState(false)

  const noDataBank = () => {
    return (<p style={{ color: "red" }}>Aún no registras cuenta ó billetera
    
    <Button size="small"
            style={{
              fontSize: 12, marginLeft:10
            }}
            onClick={() => {
              setExpandBank(!expandBank);
            }}
          >
            {expandBank ? <UpOutlined /> : <DownOutlined />} Agregar
          </Button>
    
    
    </p>)
  };
  const noDataBTC = () => {
    return (<p style={{ color: "red" }}>Aún no registras cuenta ó billetera
    
    <Button size="small"
            style={{
              fontSize: 12, marginLeft:10
            }}
            onClick={() => {
              setExpandBTC(!expandBTC);
            }}
          >
            {expandBTC ? <UpOutlined /> : <DownOutlined />} Agregar
          </Button>

    </p>)
  };
  const noDataETH = () => {
    return (<p style={{ color: "red" }}>Aún no registras cuenta ó billetera
    <Button size="small"
            style={{
              fontSize: 12, marginLeft:10
            }}
            onClick={() => {
              setExpandETH(!expandETH);
            }}
          >
            {expandETH ? <UpOutlined /> : <DownOutlined />} Agregar
          </Button>
    
    
    </p>)
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
          getProfileWs().then((res) => {
            const { data, status, errorMessage } = res;
            if (status) {
              props.user.bankAccount = data.user.bankAccount;
            }
          });

          Modal.success({
            content: "Todo exitoso. Se agregó la cuenta",
          });
          navigate("/transactions");
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

          getProfileWs().then((res) => {
            const { data, status, errorMessage } = res;
            if (status) {
              props.user.walletBTCAddress = data.user.walletBTCAddress;
            }
          });
          Modal.success({
            content: "Todo exitoso. Se agregó la billetera BTC",
          });

          navigate("/transactions");
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
          getProfileWs().then((res) => {
            const { data, status, errorMessage } = res;
            if (status) {
              props.user.walletETHAddress = data.user.walletETHAddress;
              console.log("data", data.user);
            }
          });

          Modal.success({
            content: "Todo exitoso. Se agregó la billetera ETH",
          });
          navigate("/transactions");

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
        style={{ marginBottom: 20 }}
        size={150}
        src={props.user.imageUrl}
      />

      <br />

      {props.user.role === "User" ? (
        <Button type="primary" danger size={"large"}>
          <Link to="/transactions">
            Compra o Vende Criptos! <ShoppingCartOutlined />
          </Link>
        </Button>
      ) : (
        <Button type="primary" danger size={"large"}>
          <Link to="/admin">
            Administración <BarChartOutlined />
          </Link>
        </Button>
      )}

      <Row gutter={[8, 8]} className="user-profile">
        <Col span={12}>
          <Descriptions bordered>
            <Descriptions.Item
              labelStyle={{ width: 180, fontWeight: "bold" }}
              label="Nombre"
            >{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions bordered>
            {props.user.bankAccount ? (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Cuenta Bancaria"
              >
                {props.user.bankAccount}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Cuenta Bancaria"
              >
                {noDataBank()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions title="" bordered>
            <Descriptions.Item
              labelStyle={{ width: 180, fontWeight: "bold" }}
              label="Correo electrónico"
            >
              {props.user.email}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions bordered>
            {props.user.walletBTCAddress ? (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Billetera de BTC"
              >
                {props.user.walletBTCAddress}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Billetera de BTC"
              >
                {noDataBTC()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions title="" bordered>
            <Descriptions.Item
              labelStyle={{ width: 180, fontWeight: "bold" }}
              label="Rol"
            >
              {props.user.role}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Descriptions bordered>
            {props.user.walletETHAddress ? (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Billetera de ETH"
              >
                {props.user.walletETHAddress}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item
                labelStyle={{ width: 180, fontWeight: "bold" }}
                label="Billetera de ETH"
              >
                {noDataETH()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>

<div className="add-accounts">
      {/* Form for creating bank account */}

      {(!props.user.bankAccount && expandBank )? (
        <>
          <Form
            name="bank"
            labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
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
                Registrar
              </Button>
            </Form.Item>

            
          </Form>
          <Divider/>
          
        </>
      ) : null}

      {/* Form for creating BTC account*/}

      {(!props.user.walletBTCAddress && expandBTC ) ? (
        <>
          <Form
            name="btc"
            labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
 
      
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agrega dirección de billetera BTC"
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
                Registrar
              </Button>
            </Form.Item>
          </Form>
          <Divider/>
        </>
      ) : null}

      {/* Form for creating ETH account */}

      {(!props.user.walletETHAddress && expandETH ) ? (
        <>
          <Form
            name="eth"
            labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
           
     
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agrega dirección de billetera ETH"
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
                Registrar
              </Button>
            </Form.Item>
          </Form>
          
        </>
      ) : null}
</div>
      

      {props.user.role !== 'Admin'?(

        <>
        <Divider />
        <Title level={3}>Tu resumen</Title>

        <Paragraph>
          <blockquote>
            Desde que te creaste la cuenta,{" "}
            <b>
              {props.user.firstName}, has comprado {buyOperations} veces y
              vendido {sellOperations}
            </b>{" "}
            con nuestro servicio.
            <br />
            Gracias por confiar en nosotros.
          </blockquote>
        </Paragraph>
        </>

):null}

        <Paragraph style={{color:"red"}}>
          Dale click al botón de abajo para ver todas tus operaciones.
        </Paragraph>

        <Button type="primary" size={"large"}>
          <Link to="/operations">
            Mira el detalle de tus operaciones <BarChartOutlined />
          </Link>
        </Button>
   

      
    </Content>
  );
}

export default ProfilePage;
