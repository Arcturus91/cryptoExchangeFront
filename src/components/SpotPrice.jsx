import { btcSpot, ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";
import { Button, Typography, Col, Row } from "antd";
import { RedoOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SpotPrice = () => {
  const [currentPriceBTC, setCurrentPriceBTC] = useState();
  const [currentPriceETH, setCurrentPriceETH] = useState();

  useEffect(() => {
    btcSpot().then((res) => {
      const btcSpotPrice = Number(res.data.btcPrice);
      setCurrentPriceBTC(btcSpotPrice.toFixed(2));
    });
  }, []);

  useEffect(() => {
    ethSpot().then((res) => {
      const ethSpotPrice = Number(res.data.ethPrice);
      setCurrentPriceETH(ethSpotPrice.toFixed(2));
    });
  }, []);

  const handleBTCPriceRequest = (e) => {
    btcSpot().then((res) => {
      const btcSpotPrice = Number(res.data.btcPrice);
      setCurrentPriceBTC(btcSpotPrice.toFixed(2));
    });
  };

  const handleETHPriceRequest = (e) => {
    ethSpot().then((res) => {
      const ethSpotPrice = Number(res.data.ethPrice);
      setCurrentPriceETH(ethSpotPrice.toFixed(2));
    });
  };
  return (
    <>
      <Title level={2} >Los precios actuales que manejamos</Title>


      <Row>

      <Col span={6}></Col>
      
      <Col span={6}>
      <Title level={3}>Bitcoin</Title>
      <Title level={4}>
        {currentPriceBTC}{" "}
        <Button
          type="primary"
          onClick={handleBTCPriceRequest}
          icon={<RedoOutlined />}
        />
      </Title>

      </Col>
      <Col span={6}>
    

      <Title level={3}>Ethereum</Title>
      <Title level={4}>
       {currentPriceETH}{" "}
        <Button
          type="primary"
          onClick={handleETHPriceRequest}
          icon={<RedoOutlined />}
        />
      </Title>

      </Col>
      <Col span={6}></Col>
    </Row>


  

  
    </>
  );
};



export default SpotPrice;
