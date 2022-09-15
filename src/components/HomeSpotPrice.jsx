import { btcSpot, ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";
import { Image, Row, Col, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const HomeSpotPrice = () => {
  const [currentPriceBTC, setCurrentPriceBTC] = useState();
  const [currentPriceETH, setCurrentPriceETH] = useState();
  const [socketCalls, setsocketCalls] = useState(0);

  useEffect(() => {
    btcSpot().then((res) => {
      const btcSpotPrice = Number(res.data.btcPrice);
      setCurrentPriceBTC(btcSpotPrice.toFixed(2));
      setsocketCalls((prevValue) => prevValue + 1);
    });
  }, [currentPriceETH]);

  useEffect(() => {
    ethSpot().then((res) => {
      const ethSpotPrice = Number(res.data.ethPrice);
      setCurrentPriceETH(ethSpotPrice.toFixed(2));
      setsocketCalls((prevValue) => prevValue + 1);
    });
  }, [socketCalls]);

  return (
    <div className="card-box">
      <Row>
        <Col span={24}>
          <Title type="danger" level={3}>
            Bitcoin : {currentPriceBTC ? currentPriceBTC : <LoadingOutlined />} USD
          </Title>
          <Title type="danger" level={3}>
            Ethereum : {currentPriceETH  ? currentPriceETH : <LoadingOutlined />} USD
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default HomeSpotPrice;
