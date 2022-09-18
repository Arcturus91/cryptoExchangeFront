import { useState, useEffect } from "react";
//aqui se ponen los sockets
import { binanceSocketBTC, stopWebSocket } from "../services/binanceApi-ws";

const WebSocketBTC = ()=>{

  const [priceBTC, setPriceBTC] = useState(0);
    
    const [socketCalls, setsocketCalls] = useState(0);
  
    useEffect(() => {

      binanceSocketBTC().then((res) => {
        const newPriceBTC = (Number(res.data.closingPrice)).toFixed(2);
        setPriceBTC(newPriceBTC);
        setsocketCalls((prevValue) => prevValue +1);
      }) 



    }, []); // si le quitamos la dependencia, solo se abrirá una vez, en el render.
  //lo que realmente está haciendo es abrir un socket cada vez que lo pide. en realidad no hay comunicación.
  // lo está abriendo y abriendo y abriendo.
useEffect(()=>{
  

  return ()=>{
   
    stopWebSocket()
  } 

},[])

    return (
<div>
        
      <h1>Precio del BTC {priceBTC}</h1>
      </div>
    )
}

export default WebSocketBTC;