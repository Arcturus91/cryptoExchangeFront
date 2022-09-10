import { WebSockets } from '../components';
import {AuthPage,ProfilePage,TransactionPage} from '../pages'

const routes = (props) => {
  return [
    {
      path: "/", //homepage
      element: <WebSockets/>,
    },
    {
      path: "/login",
      element: <AuthPage {...props} /> //login
    },
    {
      path: "/signup",
      element: <AuthPage {...props} /> //login
    },
    {
      path:"/profile",
      element:<ProfilePage {...props}/>
    },
    {
      path:"/transactions",
      element:<TransactionPage {...props}/>
    }
  ];
};

export default routes;
