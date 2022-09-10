import {DesktopOutlined,FileOutlined,
  PieChartOutlined,TeamOutlined,UserOutlined,} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button,Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { buyCripto } from "../services/user-ws";
import { useNavigate} from 'react-router-dom'
import { SpotPrice } from "../components";

const { Header, Content, Footer, Sider } = Layout;

function TransactionPage(props) {
const navigate = useNavigate();
    console.log('yo soy el props', props.user)

    const onFinish = (values) => {
        console.log('Success:', values);
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


      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

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
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{props.user.firstName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >

<SpotPrice/>


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
            message: 'Por favor, selecciona una cripto',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cantidad de Cripto a comprar"
        name="cryptoBuyAmount"
        rules={[
          {
            required: true,
            message: 'Por favor, ingresa la cantidad de cripto a comprar',
          },
        ]}
      >
        <Input />
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
