
import {AuthPage,ProfilePage,TransactionPage,HomePage, OperationsPage} from '../pages'

const routes = (props) => {
  return [
    {
      path: "/", //homepage
      element: <HomePage/>,
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
    },
    {
      path:"/operations",
      element:<OperationsPage {...props}/>
    }

  ];
};

export default routes;
