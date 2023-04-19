import { useState, useEffect } from "react";
import io from "socket.io-client";

import React from "react";
import { Typography, Card, Row, Col } from "antd";
import "./CryptoPrices.css";

const { Title } = Typography;

const WebSocketCryptoPrice = () => {
  const [priceBTC, setPriceBTC] = useState(null);
  const [priceETH, setPriceETH] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("btcPrice", (data) => {
      const price = Number(data.price);
      console.log("sockets btc price", price);
      setPriceBTC(price);
    });

    socket.on("ethPrice", (data) => {
      const price = Number(data.price);
      console.log("sockets ETH price", price);
      setPriceETH(price);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="web-socket-comp">
      <h1 >Current Prices</h1>
      <div className="crypto-prices">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card className="price-card">
              <Title level={4}>BTC</Title>
              <Title level={2} className="price">
                ${priceBTC ? priceBTC : "Loading..."}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card className="price-card">
              <Title level={4}>ETH</Title>
              <Title level={2} className="price">
                ${priceETH ? priceETH : "Loading..."}
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WebSocketCryptoPrice;
