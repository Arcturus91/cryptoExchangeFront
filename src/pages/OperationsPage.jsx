import { useEffect, useState } from "react";
import { getOperations } from "../services/user-ws";
import { Button, Modal, Typography } from "antd";
import { OperationsTable } from "../components";
const { Title, Paragraph } = Typography;

const OperationsPage = (props) => {
  const buyOperations = props.user._userBuys.length;
  const sellOperations = props.user._userSells.length;

  const [buys, setBuys] = useState();
  const [sells, setSells] = useState();
  const [collapsed,setCollapsed] = useState(true);

  useEffect(() => {
    Modal.success({
      content:
        "Bienvenido/a! Aquí, en tu sección de operaciones encontrarás detalles de tus compras, ventas y comprobantes.",
    });
  }, []);

  const getBuys = () => {
    getOperations().then((res) => {
      const { data, status, errorMessage } = res;
      if (status) {
        
        setBuys(data.user._userBuys);
        setSells(data.user._userSells);
        setCollapsed((prevState)=>{return !prevState});
        return;
      } else {
        Modal.error({ content: errorMessage });
      }
    });
  };

  return (
    <>
      <Title>Mis operaciones</Title>
      <Title level={2}>Resumen ejecutivo</Title>

      <Paragraph>
        {" "}
        Desde que te creaste la cuenta, {props.user.firstName}, has comprado {buyOperations} veces y
        vendido {sellOperations} con nuestro servicio. Gracias por confianr en
        nosotros.
      </Paragraph>

      <Paragraph>Dale click al botón expandir para ver el detalle de todas tus operaciones.</Paragraph>

      <Button
        onClick={() => {
          getBuys();
        }}
      >
        Expandir
      </Button>

      {!collapsed?
      <div>
      
      
    
      
   <OperationsTable buys={buys} sells={sells}/>
      
      </div>:null}


    </>
  );
};
export default OperationsPage;
