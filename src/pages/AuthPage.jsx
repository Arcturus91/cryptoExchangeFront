import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginWs, signupWs } from "../services/auth-ws";
import { Form, Modal } from "antd";
import { FormItem } from "../components";

const AuthPage = (props) => {
  const location = useLocation();
  
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (
      location.pathname === "/signup" &&
      values.password !== values.confirmPassword
    ) {
      return Modal.error({ content: "las contraseñas no coinciden." });
    }

    const service =
      location.pathname === "/signup" ? signupWs(values) : loginWs(values);

    service.then((res) => {
      const { data, status, errorMessage } = res;
      //cundo yo me logee, mi back end me va a responder con data.user. Yo se que es data.user xq así lo envio desde el backend.
      if (status) {
        console.log("data", data.user);
        props.authentication(data.user);
        Modal.success({
          content:"Todo exitoso. Ya entraste"
        })
        navigate('/profile') //esto es para irnos al profile cuando te logeas/suscribes
        return;
      } else {
        Modal.error({ content: errorMessage });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            message: "Please input your email!",
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
            message: "Please input your password!",
          },
        ]}
      />

      {location.pathname === "/signup" ? (
        <>
          <FormItem
            label="Confirm password"
            name="confirmPassword"
            type="password"
            rules={[
              {
                required: true,
                message: "Porfavor confirma la contraseña.",
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
                message: "Ingresa tu nombre",
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
                message: "Ingresa tus Apellidos",
              },
            ]}
          />
        </>
      ) : null}

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
  );
};

export default AuthPage;
