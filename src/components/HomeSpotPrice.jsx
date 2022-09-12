import { btcSpot,ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";

const HomeSpotPrice= ()=>{

const [currentPriceBTC, setCurrentPriceBTC] = useState()
const [currentPriceETH, setCurrentPriceETH] = useState()
const [socketCalls, setsocketCalls] = useState(0);

useEffect(() => {

    btcSpot().then(res=>{
        const btcSpotPrice =Number(res.data.btcPrice)
        setCurrentPriceBTC(btcSpotPrice.toFixed(2))
        setsocketCalls((prevValue) => prevValue +1);
    })

}, [currentPriceETH])

 useEffect(() => {

    ethSpot().then(res=>{
        const ethSpotPrice =Number(res.data.ethPrice)
        setCurrentPriceETH(ethSpotPrice.toFixed(2))
        setsocketCalls((prevValue) => prevValue +1);
    })

}, [socketCalls]) 



    return (
        <div>


            <h1>El precio actual del BTC es: {currentPriceBTC}</h1>
           
            <h1>El precio actual del ETH es: {currentPriceETH}</h1>
        </div>
    )
}

export default HomeSpotPrice;