import {
  UploadOutlined,
  DollarOutlined,
  WalletOutlined,
  FireOutlined,
  AppstoreOutlined,
  ProfileOutlined,UserOutlined
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  Form,
  Input,
  Modal,
  message,
  Upload, Select, Typography 
} from "antd";
import React, { useState } from "react";
import { buyCripto, sellCripto,registerReceipt } from "../services/user-ws";
import { uploadURL} from "../services/api"
import { Link, useNavigate } from "react-router-dom";
import {  SpotPrice } from "../components";
const { Title, Paragraph, Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

// --------> function init

function TransactionPage(props) {
  const [buyOrSell, setbuyOrSell] = useState("Buy");
  const [collapsed, setCollapsed] = useState(false);
  const [uploadVerifier,setuploadVerifier] = useState(false)

  const navigate = useNavigate();
  console.log("yo soy el props", props);

  const onFinish = (values) => {
    console.log("Success:", values);

    if(!uploadVerifier=== true) {
      return Modal.error({ content: "Debes subir el comprobante primero" })
    }

    if (buyOrSell === "Buy") {
      buyCripto(values).then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          console.log("data", data.user);
          Modal.success({
            content: "Todo exitoso. Se compró la cripto",
          });
          navigate("/profile"); //esto es para irnos al profile cuando te logeas/suscribes
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    } else if (buyOrSell === "Sell") {
      sellCripto(values).then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          console.log("data", data.user);
          Modal.success({
            content: "Todo exitoso. Se vendió la cripto",
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

  const configUpload = {
    name: "image",
    action: uploadURL,

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        console.log("que es info", info.file.response.url.uri);
        
       const receiptUrl =  info.file.response.url.uri
        
        registerReceipt({receiptUrl}).then((res) => {
          console.log("yo soy el res del front", res)
          const { data, status, errorMessage } = res;
          if (status) {
            console.log("data", data.user);
            setuploadVerifier(true)
            Modal.success({
              content: "Todo exitoso. Se registró el comprobante. Ya puedes presionar comprar.",
            });
            return;
          } else {
            Modal.error({ content: errorMessage });
          }
        });
        //message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

const operationHandler = (e) =>{
  setbuyOrSell(e)
}



  // ----> RETURN PART

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="0" icon={<UserOutlined />}>
          <Link to="/profile">Mi perfil</Link>
          </Menu.Item>

          <Menu.Item key="1" onClick={()=>operationHandler("Buy")} icon={<DollarOutlined />}>
            Compra Criptos
          </Menu.Item>

          <Menu.Item
            key="2"
            onClick={()=>operationHandler("Sell")}
            icon={<DollarOutlined />}
          >
            Vende Criptos
          </Menu.Item>

          <Menu.Item key="3" icon={<WalletOutlined />}>
            <Link to="/operations">Mis operaciones</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<DollarOutlined />}>
            <Link to="/">Noticias de bolsa</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FireOutlined />}>
            <Link to="/">Noticias de criptos</Link>
          </Menu.Item>

          <Menu.Item
            onClick={props.handleLogout}
            key="6"
            icon={<AppstoreOutlined />}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Usuario</Breadcrumb.Item>
            <Breadcrumb.Item>{props.user.firstName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >



<SpotPrice  />

<>
            <Title level={2}>Cómo operar:</Title>
            <Text strong>Primer paso: Verifica el precio y sube el comprobante </Text>
</>
            <Upload {...configUpload}>
              <Button icon={<UploadOutlined />}>Sube el comprobante</Button>
            </Upload>


            {buyOrSell === "Buy" ? (
              <>

              <Text strong>Segundo paso: Selecciona la cripto, la cantidad y dale comprar </Text>

                <Form

                  name="buyCripto"
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
                    label="La Criptomoneda:"
                    name="cryptoName"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecciona una cripto",
                      },
                    ]}
                  >
                    <Select
            placeholder="Selecciona una de las opciones"
            allowClear
          >
            <Option value="BTC">Bitcoin</Option>
            <Option value="ETH">Ethereum</Option>
          </Select>
                  </Form.Item>

                  <Form.Item
                    label="Cantidad de Cripto a comprar"
                    name="cryptoBuyAmount"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, ingresa la cantidad de cripto a comprar",
                      },
                    ]}
                  >
                    <Input
                    />
                  </Form.Item>


                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 10,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Comprar
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <>
              <Text strong>Segundo paso: Selecciona la cripto, la cantidad y dale vender </Text>

              <Form

name="sellCripto"
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
  label="La Criptomoneda:"
  name="cryptoName"
  rules={[
    {
      required: true,
      message: "Por favor, selecciona una cripto",
    },
  ]}
>
  <Select
placeholder="Selecciona una de las opciones"
allowClear
>
<Option value="BTC">Bitcoin</Option>
<Option value="ETH">Ethereum</Option>
</Select>
</Form.Item>

<Form.Item
  label="Cantidad de Cripto a vender"
  name="cryptoSellAmount"
  rules={[
    {
      required: true,
      message: "Por favor, ingresa la cantidad de cripto a vender",
    },
  ]}
>
  <Input
  />
</Form.Item>


<Form.Item
  wrapperCol={{
    offset: 8,
    span: 10,
  }}
>
  <Button type="primary" htmlType="submit">
    Vender
  </Button>
</Form.Item>
</Form>
              </>
            )}

            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Alpaca Exchange ©2022 Created by Arturo Barrantes
        </Footer>
      </Layout>
    </Layout>
  );
}

export default TransactionPage;
