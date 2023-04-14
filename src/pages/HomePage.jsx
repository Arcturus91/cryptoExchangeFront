
import {HomeSpotPrice } from '../components';
import { Typography, Image } from "antd";
const {Title} = Typography;
//import "./App.css";

const HomePage = () =>{


    return (
        <div className="home-page" >

            <Title level={1}>Bienvenido a Alpaca Exchange</Title>
            <Title level={4}>La primera casa de cambio de criptomonedas latinoamericana</Title>
            <HomeSpotPrice/>
            <img src="https://res.cloudinary.com/dad5dandd/image/upload/r_10/v1663189695/AlpacaExchange/alpacaExchangeLandingPage.png" alt="alpacaExchangeWorld"/>
        </div>


    )
}

    export default HomePage;

    