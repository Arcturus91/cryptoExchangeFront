
import {Link, useLocation} from "react-router-dom"
import {loginWs,signupWs} from '../services/auth-ws';
import { Button, Form, Input } from 'antd';
import {FormItem } from '../components'

 const AuthPage =()=>{
  const location = useLocation();
  console.log("qe location", location)

  const onFinish = (values) => {
    if(location.pathname ==="/signup" && values.password !== values.confirmPassword){
      return alert ("las contraseñas no coinciden.")
    }

    const service = location.pathname ==="/signup" ? signupWs(values) : loginWs(values)

    service.then(res=>{
     const {data,status,errorMessage} = res
if(status){
  alert ("pudiste entrar")
  return;
} else {
  alert (errorMessage)
}
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 
return (


<Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormItem
        label="Correo electrónico"
        name="email"
        type="text"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      />


      <FormItem
        label="Password"
        name="password"
        type="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      />

{location.pathname==="/signup" ? 

<>
 <FormItem
        label="Confirm password"
        name="confirmPassword"
        type="password"
        rules={[
          {
            required: true,
            message: 'Porfavor confirma la contraseña.',
          },
        ]}
      />


 <FormItem
        label="Nombre"
        name="firstName"
        type="text"
        rules={[
          {
            required: true,
            message: 'Ingresa tu nombre',
          },
        ]}
      />

 <FormItem
        label="Apellidos"
        name="lastName"
        type="text"
        rules={[
          {
            required: true,
            message: 'Ingresa tus Apellidos',
          },
        ]}
      />
      
      </>:null }



    

      <FormItem
      button_text="Button"
      type="button"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        
      />
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      



        {location.pathname === "/signup" ? (
        <p>
          Si ya tienes cuenta, <Link to="/login">ingresa</Link>
        </p>
      ) : (
        <p>
          Si aún no tienes cuenta, <Link to="/signup">registrate</Link>
        </p>
      )}

    </Form>
  
  )} 

  export default AuthPage;










