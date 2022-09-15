import { Layout, Descriptions, Avatar } from "antd";
import { Button, Form, Input, Modal } from "antd";
import {
  createBankAccWs,
  createBTCwalletWs,
  createETHwalletWs,
} from "../services/user-ws";
import { useNavigate, Link } from "react-router-dom";
import {
  UserOutlined,
  DollarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
const { Content } = Layout;

function ProfilePage(props) {
  const noData = () => {
    return <p style={{ color: "red" }}>Aún no registras cuenta ó billetera</p>;
  };

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
    <Content>
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={props.user.imageUrl}
      />

      <Descriptions title="User Info">
        <Descriptions.Item label="Nombre:">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Correo electrónico:">
          {props.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Rol:">{props.user.role}</Descriptions.Item>

        {props.user.bankAccount ? (
          <Descriptions.Item label="Cuenta Bancaria:">
            {props.user.bankAccount}
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="Cuenta Bancaria:">
            {noData()}
          </Descriptions.Item>
        )}

        {props.user.walletBTCAddress ? (
          <Descriptions.Item label="Billetera de BTC:">
            {props.user.walletBTCAddress}
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="Billetera de BTC:">
            {noData()}
          </Descriptions.Item>
        )}
        {props.user.walletETHAddress ? (
          <Descriptions.Item label="Billetera de ETH:">
            {props.user.walletETHAddress}
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="Billetera de ETH:">
            {noData()}
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Form for creating bank account */}

      {!props.user.bankAccount?
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
          <Input  prefix={<DollarOutlined />} />
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
      </>:null}

      {/* Form for creating BTC account*/}


      {!props.user.walletBTCAddress?
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
      </>:null}

      {/* Form for creating ETH account */}

      
{!props.user.walletETHAddress?
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
</Form></>:null}



{props.user.role === "User"?(
<p>
          <Link to="/transactions">Compra y vende Criptomonedas como todo un pro</Link>
        </p>)
 :(<p>
          <Link to="/admin">Administra el negocio como todo un pro</Link>
        </p>
 )}

      
    </Content>
  );
}

export default ProfilePage;


