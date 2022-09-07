import AuthPage from '../pages/AuthPage'

const routes = (props) => {
  return [
    {
      path: "/", //homepage
      element: <h1>Este es el home</h1>,
    },
    {
      path: "/login",
      element: <AuthPage /> //login
    },
    {
      path: "/signup",
      element: <AuthPage /> //login
    },
  ];
};

export default routes;
