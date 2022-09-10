import { useState, useEffect } from "react";
import "./App.css";
import routes from "./config/routes";
import { Routes, Route } from "react-router-dom";
import { Navbar,WebSockets } from "./components";
import { logoutWs } from "./services/auth-ws";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);

  





  const navigate = useNavigate();
  function authentication(user) {
    setUser(user);
  }
  function handleLogout() {
    Modal.confirm({
      title: "Cerrar Sesión",
      content: "Estás seguro de cerrar sesión?",
      onOk() {
        logoutWs().then((res) => {
          const { data, status, errorMessage } = res;

          if (status) {
            Modal.success({
              content: data.successMessage,
            });
            navigate("/");
            setUser(null);
          } else {
            alert(errorMessage);
          }
        });
      },
    });
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
      
<WebSockets/>

    </div>
  );
}

export default App;
