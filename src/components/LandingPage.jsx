import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import "./LandingPage.css";
import { Row, Col, Card } from "antd";
import {
  CheckCircleOutlined,
  SwapOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import WebSocketCryptoPrice from "./WebSocketCryptoPrice";

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="main-title">Alpaca Exchange</h1>
        <WebSocketCryptoPrice />
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/dad5dandd/image/upload/r_10/v1663189695/AlpacaExchange/alpacaExchangeLandingPage.png"
            alt="alpacaLandingPage"
          />
        </div>
        <Paragraph className="description">
          Cryptocurrencies have revolutionized global finance, democratizing
          access to financial services and enabling cross-border transactions
          without intermediaries. Blockchain technology, which underpins
          cryptocurrencies, has spurred innovation in various industries beyond
          finance. However, digital currencies face challenges, including
          associations with illicit activities and environmental concerns due to
          energy-intensive mining. As cryptocurrencies gain traction, it's
          crucial for governments, businesses, and individuals to embrace the
          benefits while addressing the risks. The impact of cryptocurrencies on
          society hinges on navigating this financial landscape, balancing
          innovation, security, and sustainability.
        </Paragraph>

        <div className="features-section">
          <h1 level={3}>Why Choose Our Money Exchange Service?</h1>
          <Row className="cards-container" gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card>
                <CheckCircleOutlined className="feature-icon" />
                <Title level={4}>Secure Transactions</Title>
                <Paragraph>
                  Our platform uses state-of-the-art encryption to ensure the
                  safety of your transactions.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card>
                <SwapOutlined className="feature-icon" />
                <Title level={4}>Competitive Rates</Title>
                <Paragraph>
                  We offer competitive exchange rates, allowing you to get the
                  most out of your money.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card>
                <CustomerServiceOutlined className="feature-icon" />
                <Title level={4}>Dedicated Support</Title>
                <Paragraph>
                  Our support team is available 24/7 to assist you with any
                  questions or concerns.
                </Paragraph>
              </Card>
            </Col>
            {/* Add more feature cards as needed */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
