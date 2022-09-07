
import './App.css';
import routes from './config/routes';
import {Routes, Route} from 'react-router-dom'
import {Navbar} from  './components'
import {Link} from 'react-router-dom'
//aqui se ponen los sockets


function App() {

  return (
    <div className="App">
<Navbar user={false}/>
<Routes>
  {routes().map(({path,element},index_route)=><Route key={path} {...{path,element}} />)}
</Routes>

    </div>
  );
}

export default App;

