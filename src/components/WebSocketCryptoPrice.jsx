import { useState, useEffect } from "react";
import io from "socket.io-client";

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
    <div>
      <div>BTC ${priceBTC ? <p>{priceBTC}</p> : <p>Loading...</p>}</div>

      <div>ETH ${priceETH ? <p>{priceETH}</p> : <p>Loading...</p>}</div>
    </div>
  );
};

export default WebSocketCryptoPrice;
