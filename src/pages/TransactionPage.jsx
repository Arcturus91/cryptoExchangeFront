import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  DollarOutlined,
  WalletOutlined,
  FireOutlined,
  AppstoreOutlined,
  MessageOutlined,
  ProfileOutlined,
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
  Upload,
} from "antd";
import React, { useState } from "react";
import { buyCripto } from "../services/user-ws";
import { Link, useNavigate } from "react-router-dom";
import { FormItem, SpotPrice } from "../components";

const { Header, Content, Footer, Sider } = Layout;

// --------> function init

function TransactionPage(props) {
  const [buyOrSell, setbuyOrSell] = useState("Buy");
  const [collapsed, setCollapsed] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  console.log("yo soy el props", props);

  const onFinish = (values) => {
    console.log("Success:", values);

    if (buyOrSell === "buy") {
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
    }

    //AQUI iria el ELSE para el SELL
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const configUpload = {
    name: "image",
    action: "http://localhost:5005/api/user/my-profile/singleUpload",

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        console.log("que es info", info);
        setImageUrl(info.file.response.url.uri);
        message.success(`${info.file.name} file uploaded successfully`);
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
          <Menu.Item icon={<ProfileOutlined />} />

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
            <Link to="/profile">Mis operaciones</Link>
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

            {buyOrSell === "Buy" ? (
              <>
                <Form
                  name="buyCripto"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Selecciona la Criptomoneda que quieres comprar"
                    name="cryptoName"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecciona una cripto",
                      },
                    ]}
                  >
                    <Input
                    
                    />
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
                      span: 16,
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
                <h1>Hello world</h1>
              </>
            )}

            <Upload {...configUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
