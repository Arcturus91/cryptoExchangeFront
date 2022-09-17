import { getAllAssets,addInventory,addCash,createCrypto } from "../services/admin-ws";
import { Modal, Typography, Button, Col, Row, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { InventoryTable } from "../components";
const { Title } = Typography;

const AdminPage = (props) => {
  const [inventory, setInventory] = useState();
  const [financeObj, setFinanceObj] = useState();
  const [cashForm, setcashForm] = useState(false);
  const [addInventoryForm, setaddInventoryForm] = useState(false)
  const [addCryptoForm, setaddCryptoForm] = useState(false)


  const addCashHandler = () => {
    setcashForm((prevState) => {
      return !prevState;
    });
  };

  const addInventoryHandler = ()=>{
    setaddInventoryForm((prevState) => {
      return !prevState;
      
    });
  }

  const addNewCryptoHandler = ()=>{
    setaddCryptoForm((prevState) => {
      return !prevState;
    });
  }

 

  const onFinish = (values) => {
    console.log("lo que envio",values)

    if(values && cashForm){
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
    })} else if (values && addInventoryForm){

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
      })

    } else if (values && addCryptoForm){
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
      })

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
  }, [cashForm,addInventoryForm,addCryptoForm]);

  return (
    <div className="admin-page">
      <Title level={2}>Bienvenido administrador: {props.user.firstName}</Title>

<Row>
      <Title level={3}>Los activos del negocio:</Title>





      <InventoryTable inventory={inventory} />

{/* --------------------- */}


 <Button
            onClick={() => {
              addNewCryptoHandler();
            }}
          >
            {" "}
           Registrar nueva crypto{" "}
          </Button>


      {addCryptoForm ? (
            <Form
              name="addCrypto"
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
                    rules={[
          {
            required: true,
            message: "Porfavor, define la criptomoneda a registrar.",
          },
        ]}  
              
               label="Criptomoneda a registrar" name="cryptoName">
                <Input  />
              </Form.Item>
              <Form.Item
              rules={[
          {
            required: true,
            message: "Porfavor, define la cantidad a comprar.",
          },
        ]}  
               label="Cantidad" name="coinQuantity">
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Registrar
                </Button>
              </Form.Item>
            </Form>
          ) : null}






{/* --------------------- */}
      <Button
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
              <Form.Item label="Criptomoneda a comprar" name="cryptoName">
                <Input />
              </Form.Item>
              <Form.Item label="Cantidad" name="cryptoBuyAmount">
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
          ) : null}
          </Row>
      

      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Title level={3}>
            Efectivo en cuentas:{" "}
            {financeObj ? financeObj.cash : <LoadingOutlined />} USD
          </Title>
        </Col>
        <Col span={8}>
          <Button
            onClick={() => {
              addCashHandler();
            }}
          >
            {" "}
            Agregar cash{" "}
          </Button>

          {cashForm ? (
            <Form
              name="addCash"
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
              <Form.Item label="Cash a depositar" name="cash">
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Depositar
                </Button>
              </Form.Item>
            </Form>
          ) : null}
        </Col>
      </Row>

      <Col span={24}>
        <Title level={3}>
          Ganancias Acumuladas:{" "}
          {financeObj ? financeObj.profits : <LoadingOutlined />} USD
        </Title>
      </Col>
    </div>
  );
};

export default AdminPage;
