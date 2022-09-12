import { btcSpot,ethSpot } from "../services/binanceApi-ws";
import { useState, useEffect } from "react";
import { Button } from "antd";

const SpotPrice = ()=>{
   

const [currentPriceBTC, setCurrentPriceBTC] = useState()
const [currentPriceETH, setCurrentPriceETH] = useState()

useEffect(() => {

    btcSpot().then(res=>{
        const btcSpotPrice =Number(res.data.btcPrice)
        setCurrentPriceBTC(btcSpotPrice.toFixed(2))
        
    })

}, [])

useEffect(() => {

    ethSpot().then(res=>{
        const ethSpotPrice =Number(res.data.ethPrice)
        setCurrentPriceETH(ethSpotPrice.toFixed(2))
    })

}, [])


const handleBTCPriceRequest = (e)=>{
    
    btcSpot().then(res=>{
        const btcSpotPrice =Number(res.data.btcPrice)
        setCurrentPriceBTC(btcSpotPrice.toFixed(2))
    }

    )
}

const handleETHPriceRequest = (e)=>{
    
    ethSpot().then(res=>{
        const ethSpotPrice =Number(res.data.ethPrice)
        setCurrentPriceETH(ethSpotPrice.toFixed(2))
    }

    )
}
    return (
        <div>
            <h1>El precio actual del BTC es: {currentPriceBTC}</h1>
            <Button type="primary" onClick={handleBTCPriceRequest}>Actualizar precio</Button>
            <h1>El precio actual del ETH es: {currentPriceETH}</h1>
            <Button type="primary" onClick={handleETHPriceRequest}>Actualizar precio</Button>
        </div>
    )
}

export default SpotPrice;