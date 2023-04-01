import { useState, useEffect } from "react";
//aqui se ponen los sockets
import { binanceSocketETH, stopWebSocket } from "../services/binanceApi-ws";

const WebSockets = ()=>{

    const [priceETH, setPriceETH] = useState(0);
    
    const [socketCalls, setsocketCalls] = useState(0);
  
    useEffect(() => {

      binanceSocketETH().then((res) => {
        const newPriceETH = (Number(res.data.closingPrice)).toFixed(2);
        setPriceETH(newPriceETH);
        setsocketCalls((prevValue) => prevValue + 1);
        
    })
    }, []);
  //lo que realmente está haciendo es abrir un socket cada vez que lo pide. en realidad no hay comunicación.
  // lo está abriendo y abriendo y abriendo.
useEffect(()=>{


  return ()=>{
    stopWebSocket()
  } 

},[])

    return (
<div>
        
      <h1>Precio del ETH {priceETH}</h1>
      </div>
    )
}

export default WebSockets;