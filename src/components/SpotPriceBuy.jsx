import { btcSpot, ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";
import { Button, Typography, Col, Row, Divider } from "antd";
import { RedoOutlined, LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SpotPriceBuy = () => {
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
      <Title level={3} >Los precios con los que operamos:</Title>


      <Row>

      <Col span={6}/>
      <Col span={6}>
      <Title level={4}>Bitcoin</Title>
      <Title level={5}>
      
        {  currentPriceBTC   ? (currentPriceBTC*1.01).toFixed(2) : <LoadingOutlined />} USD

        <Button
          type="primary"
          onClick={handleBTCPriceRequest}
          icon={<RedoOutlined />}
        />
      </Title>

      </Col>
      <Col span={6}>
      <Title level={4}>Ethereum</Title>
      <Title level={5}>
       { currentPriceETH ? (currentPriceETH*1.01).toFixed(2) : <LoadingOutlined />} USD
        <Button
          type="primary"
          onClick={handleETHPriceRequest}
          icon={<RedoOutlined />}
        />
      </Title>

      </Col>
      <Col span={6}/>
      <Divider/>
    </Row>


  

  
    </>
  );
};



export default SpotPriceBuy;
