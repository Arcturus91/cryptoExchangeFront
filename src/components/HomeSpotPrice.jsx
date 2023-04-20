import { btcSpot, ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";
import { Row, Col, Typography, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import WebSocketCryptoPrice from "./WebSocketCryptoPrice";

const { Title } = Typography;

const HomeSpotPrice = () => {
  return (
    <div className="card-box">
      <Title type="danger" level={5}>
        Precios en tiempo real
      </Title>

      <WebSocketCryptoPrice />

      <Divider />
    </div>
  );
};

export default HomeSpotPrice;
