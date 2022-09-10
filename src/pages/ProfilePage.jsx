import { Layout, Descriptions, Avatar } from "antd";
import { Button, Form, Input, Modal } from "antd";
import { createBankAccWs, createBTCwalletWs,createETHwalletWs } from "../services/user-ws";
import { useNavigate, Link} from "react-router-dom";
 import {UserOutlined} from '@ant-design/icons'
const { Content } = Layout;

function ProfilePage(props) {
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
    } else if (walletBTCAddress) { //1B6n6MhWoCX94Yv8YC8a19SCaKEteKqEB7
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
    }
    else if (walletETHAddress) { 
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
    <Content>
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={props.user.imageUrl}
      />

      <Descriptions title="User Info">
        <Descriptions.Item label="Nombre:">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Email">{props.user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{props.user.role}</Descriptions.Item>
      </Descriptions>

      {/* Form for creating bank account */}
     <Form
        name="bank"
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
          label="Add bank account"
          name="bankAccount"
          rules={[
            {
              required: true,
              message:
                "Porfavor ingresa la cuenta bancaria. Necesitas 14 dígitos.",
            },
          ]}
        >
          <Input maxLength={14} placeholder="default size" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Form for creating BTC account*/}

      <Form
        name="btc"
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
          label="Agrega la dirección de tu billetera que admita BTC"
          name="walletBTCAddress"
          rules={[
            {
              required: true,
              message: "Porfavor ingresa la dirección de la billetera",
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
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Form for creating ETH account */}
      <Form
        name="eth"
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
          label="Agrega la dirección de tu billetera que admita ETH"
          name="walletETHAddress"
          rules={[
            {
              required: true,
              message: "Porfavor ingresa la dirección de la billetera",
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
            Submit
          </Button>
        </Form.Item>

        <p>
          Si ya tienes tus cuentas y wallets, <Link to="/transactions">opera</Link>
        </p>
      </Form>
    </Content>
  );
}

export default ProfilePage;
