
import {AuthPage,ProfilePage,TransactionPage,HomePage, OperationsPage, AdminPage,EducationPage,TeamPage} from '../pages'

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
    ,
    {
      path:"/admin",
      element:<AdminPage {...props}/>
    }
    ,
    {
      path:"/team",
      element:<TeamPage/>
    }
    ,
    {
      path:"/education",
      element:<EducationPage/>
    }
  ];
};

export default routes;
