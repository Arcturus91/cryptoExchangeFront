import { useState, useEffect } from "react";
//aqui se ponen los sockets
import { binanceSocketETH, binanceSocketBTC } from "../services/binanceSocket-ws";

const WebSockets = ()=>{

    const [priceETH, setPriceETH] = useState(0);
    const [priceBTC, setPriceBTC] = useState(0);
    const [socketCalls, setsocketCalls] = useState(0);
  
    useEffect(() => {
        
      binanceSocketETH().then((res) => {
        const newPriceETH = (Number(res.data.closingPrice)).toFixed(2);
        setPriceETH(newPriceETH);
        setsocketCalls((prevValue) => prevValue + 1);
        console.log(newPriceETH, socketCalls);
      
      binanceSocketBTC().then((res) => {
        const newPriceBTC = (Number(res.data.closingPrice)).toFixed(2);
        setPriceBTC(newPriceBTC);
        setsocketCalls((prevValue) => prevValue +1);
        console.log(newPriceBTC, socketCalls);
      })});
  
    }, [priceETH, priceBTC, socketCalls]);
  
   


    return (
<div>
        <h1>Precio del Ethereum {priceETH}</h1>
      <h1>Precio del Bitcoin {priceBTC}</h1>
      </div>
    )
}

export default WebSockets;