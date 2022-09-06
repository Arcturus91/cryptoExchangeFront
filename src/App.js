
import './App.css';
import Input from '@mui/material/Input';
import { Button, FormControl, InputLabel } from '@mui/material';
import { useState } from "react";

function App() {


    const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const { email, password,confirmPassword,firstName,lastName } = form;

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm(prevState=>({ ...prevState, [name]: value }));
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email,
    password,
    confirmPassword,
    firstName,
    lastName
    }

  console.log("credentials",credentials)
  }



  return (
    <div className="App">


<form onSubmit={handleSignupSubmit}>

<Input name='email' value={email} onChange={handleInputChange} />

<Input name='password' value={password} onChange={handleInputChange} />

<Input name='confirmPassword' value={confirmPassword} onChange={handleInputChange} />

<Input name='firstName' value={firstName} onChange={handleInputChange} />

<Input name='lastName' value={lastName} onChange={handleInputChange} />

<Button type='submit' color='primary'>Sign Up</Button>
</form>




    </div>
  );
}

export default App;
