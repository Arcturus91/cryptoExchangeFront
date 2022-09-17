import {
  getAllAssets,
  addInventory,
  addCash,
  createCrypto,
} from "../services/admin-ws";
import { Modal, Typography, Button, Col, Row, Form, Input, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { InventoryTable } from "../components";
const { Title,Paragraph,Text } = Typography;

const AdminPage = (props) => {
  const [inventory, setInventory] = useState();
  const [financeObj, setFinanceObj] = useState();
  const [cashForm, setcashForm] = useState(false);
  const [addInventoryForm, setaddInventoryForm] = useState(false);
  const [addCryptoForm, setaddCryptoForm] = useState(false);

  const addCashHandler = () => {
    setcashForm((prevState) => {
      return !prevState;
    });
  };

  const addInventoryHandler = () => {
    setaddInventoryForm((prevState) => {
      return !prevState;
    });
  };

  const addNewCryptoHandler = () => {
    setaddCryptoForm((prevState) => {
      return !prevState;
    });
  };

  const onFinish = (values) => {
    console.log("lo que envio", values);

    if (values && cashForm) {
      addCash(values).then((res) => {
        const { data, status, errorMessage } = res;
        console.log("Success:", data);
        if (status) {
          Modal.success({
            content: "Todo exitoso. Se agregó el cash",
          });
          setcashForm((prevState) => {
            return !prevState;
          });
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    } else if (values && addInventoryForm) {
      addInventory(values).then((res) => {
        const { data, status, errorMessage } = res;
        console.log("Success:", data);
        if (status) {
          Modal.success({
            content: "Todo exitoso. Se compró la Cripto",
          });
          setaddInventoryForm((prevState) => {
            return !prevState;
          });
          return;
        } else {
          Modal.error({ content: errorMessage });
        }
      });
    } else if (values && addCryptoForm) {
      createCrypto(values).then((res) => {
        const { data, status, errorMessage } = res;
        console.log("Success:", data);
        if (status) {
          Modal.success({
            content: "Todo exitoso. Se registró la Cripto",
          });
          setaddCryptoForm((prevState) => {
            return !prevState;
          });
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

  useEffect(() => {
    getAllAssets().then((res) => {
      const { data, status, errorMessage } = res;
      if (status) {
        setInventory(data.totalInventory);
        data.finances.map((item) => setFinanceObj(item));
      } else {
        Modal.error({ content: errorMessage });
      }
    });
  }, [cashForm, addInventoryForm, addCryptoForm]);

  return (
    <div className="admin-page">
      <Title level={2}>Bienvenido administrador: {props.user.firstName}</Title>

<div style={{paddingLeft:200,paddingRight:200,paddingBottom:20}}>
      <Title level={3}>Instrucciones</Title>
    <Paragraph>
     En esta página encontrarás la lista de cripto monedas que AlpacaExchange tiene en su inventario.
     Cualquier cripto que veas que está en baja disponibilidad, la repones. Presionas 
      <Text code>Comprar Inventario</Text> para eso. Si falta efectivo en las cuentas, presiona <Text code>Agregar Cash</Text>).
      Finalmente, si no tenemos la crypto y quieres registrarla, presiona <Text code>Registrar nueva crypto</Text>.
    </Paragraph>

</div>

<Row gutter={[8, 16]}>

<Col span={6} />
        <Col span={6}>
          <Title level={5}>
            Efectivo en cuentas:{" "}
            {financeObj ? financeObj.cash.toFixed(2) : <LoadingOutlined />} USD
          </Title>
        </Col>
        <Col span={6}>
          <Button type="primary"
            onClick={() => {
              addCashHandler();
            }}
          >
            {" "}
            Agregar cash{" "}
          </Button>
</Col>
<Col span={6} />

<Col span={24}>
          {cashForm ? (
            <Form
              name="addCash"
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
              <Form.Item label="Cash a depositar" name="cash">
                <Input />
              </Form.Item>

              <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
              >
                <Button type="primary" htmlType="submit">
                  Depositar
                </Button>
              </Form.Item>
            </Form>
          ) : null}
          </Col>
        
      
          <Col span={6} />
      <Col span={6}>
        <Title level={5}>
          Ganancias Acumuladas:{" "}
          {financeObj ? financeObj.profits.toFixed(2) : <LoadingOutlined />} USD
        </Title>
      </Col>

      <Col span={6} >
<Paragraph >El porcentaje de ganancia está seteado en el 1%. Aumenta el % de ganancia cuando haya mayor volatilidad en los mercados para maximizar gananacias. Redúcelo cuando requieras liquidez.</Paragraph>
      </Col>
      <Col span={6} />
   

      <Col span={6} />
<Col span={6}>
        <Button type="primary"
          onClick={() => {
            addNewCryptoHandler();
          }}
        >
          {" "}
          Registrar nueva crypto{" "}
        </Button>

        {addCryptoForm ? (
          <Form
          className="add-accounts"
            name="addCrypto"
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
              rules={[
                {
                  required: true,
                  message: "Porfavor, define la criptomoneda a registrar.",
                },
              ]}
              label="Criptomoneda a registrar"
              name="cryptoName"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Porfavor, define la cantidad a comprar.",
                },
              ]}
              label="Cantidad"
              name="coinQuantity"
            >
              <Input />
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
        ) : null}

        </Col>


<Col span={6}>
        <Button type="primary"
          onClick={() => {
            addInventoryHandler();
          }}
        >
          {" "}
          Comprar inventario{" "}
        </Button>

        {addInventoryForm ? (
          <Form
            name="addInventory"
            className="add-accounts"
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
            <Form.Item label="Criptomoneda a comprar" name="cryptoName">
              <Input />
            </Form.Item>
            <Form.Item label="Cantidad" name="cryptoBuyAmount">
              <Input />
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
        ) : null}
        </Col>
        <Col span={6} />



<Divider/>

<Col span={24}>
        <InventoryTable inventory={inventory} />
</Col>

</Row>
      
    </div>
  );
};

export default AdminPage;
