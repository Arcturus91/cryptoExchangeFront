import { useState, useEffect } from "react";
import "./App.css";
import routes from "./config/routes";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { logoutWs } from "./services/auth-ws";
import { Modal } from "antd";
import { Link } from "react-router-dom";
//aqui se ponen los sockets

function App() {
  const [user, setUser] = useState(null);

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
            alert(data.successMessage);
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
    </div>
  );
}

export default App;
