import { useEffect, useState } from "react";
import { getOperations } from "../services/user-ws";
import { Button, Modal, Typography } from "antd";
import { OperationsTable } from "../components";
const { Title, Paragraph } = Typography;

const OperationsPage = (props) => {
  const buyOperations = props.user._userBuys.length;
  const sellOperations = props.user._userSells.length;
  const role = props.user.role

  const [buys, setBuys] = useState();
  const [sells, setSells] = useState();

  useEffect(() => {
    getOperations().then((res) => {
      Modal.success({
        content:
          "Bienvenido/a! Aquí, en tu sección de operaciones encontrarás detalles de tus compras, ventas y comprobantes.",
      });

      const { data, status, errorMessage } = res;
      if (status) {
        setBuys(data.user._userBuys);
        setSells(data.user._userSells);

        return;
      } else {
        Modal.error({ content: errorMessage });
      }
    });


  }, []);

 

  return (
    <>
      <Title>Mis operaciones</Title>

      <OperationsTable buys={buys} sells={sells} role={role}/>
    </>
  );
};
export default OperationsPage;
