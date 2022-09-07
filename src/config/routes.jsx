import AuthPage from '../pages/AuthPage'

const routes = (props) => {
  return [
    {
      path: "/", //homepage
      element: <h1>Este es el home</h1>,
    },
    {
      path: "/login",
      element: <AuthPage {...props} /> //login
    },
    {
      path: "/signup",
      element: <AuthPage {...props} /> //login
    },
  ];
};

export default routes;
