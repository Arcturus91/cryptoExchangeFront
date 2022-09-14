import { getAllAssets } from "../services/admin-ws";
import { Modal, Typography,Button } from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { InventoryTable } from "../components";
const { Title } = Typography;


const AdminPage = (props) => {
  const [inventory, setInventory] = useState();
  const [financeObj, setFinanceObj] = useState();
  const [cash,setCash] = useState(false);

  const addCashHandler = (e) =>{
console.log(e)
  }
 


  useEffect(() => {
    getAllAssets().then((res) => {
      const { data, status, errorMessage } = res;
      if (status) {
        setInventory(data.totalInventory);
        data.finances.map((item) =>setFinanceObj(item));
        
        console.log("yo soy finance obj", financeObj)
      } else {
        Modal.error({ content: errorMessage });
      }
    });
  }, []);


  return (
    <>
      <Title level={2}>Bienvenido administrador: {props.user.firstName}</Title>

      <Title level={3}>Los activos del negocio:</Title>
      <Title level={4}>El inventario</Title>
      <InventoryTable inventory={inventory} />


      <Title level={4}>Efectivo en cuentas </Title>
      <Title level={5}>
      
      {financeObj ? financeObj.cash:<LoadingOutlined /> }

      {/* <Button onClick={()=>{addCashHandler}}>Agregar fondos?</Button>
      hardcodeado /
       */}
      </Title>
      <Title level={4}>Ganancias Acumuladas </Title>
      <Title level={5}>

      {financeObj? financeObj.profits :<LoadingOutlined /> }
      </Title>
    </>
  );
};

export default AdminPage;
