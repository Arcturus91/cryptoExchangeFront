import { useState, useEffect } from "react";
import "./App.css";
import routes from "./config/routes";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { logoutWs } from "./services/auth-ws";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
//aqui se ponen los sockets
import {binanceSocket} from './services/binanceSocket-ws'

function App() {
  const [user, setUser] = useState(null);
const [priceETH,setPriceETH] = useState();

useEffect(
  () => {
  binanceSocket().then((res)=>{
    
    const newPriceETH =Number(res.data.closingPrice) + 0.0001
  
    setPriceETH(newPriceETH.toFixed(2)) //es there a way to improve this? useEffects stops when noticing the same price.
  })},
  
  [priceETH])


const navigate = useNavigate()
  function authentication(user) {
    setUser(user);
  }
  function handleLogout() {
    Modal.confirm({
      title:"Cerrar Sesión",
      content:"Estás seguro de cerrar sesión?",
      onOk(){
        logoutWs().then((res) => {
          const { data, status, errorMessage } = res;

          if (status) {
            Modal.success({
              content:data.successMessage,
            })
            navigate('/')
            setUser(null);
          } else {
            alert(errorMessage);
          }
        });
      }
    })
  }
  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        {routes({ user, handleLogout, authentication }).map(
          ({ path, element }, index_route) => (
            <Route key={path} {...{ path, element }} />
          )
        )}
      </Routes>
      <h1>Precio del Ethereum {priceETH}</h1>

    </div>
  );
}

export default App;
