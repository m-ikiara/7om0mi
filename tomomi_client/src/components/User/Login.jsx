import axios from 'axios';
import { useState } from 'react';
import { loginFields } from '../../constants/loginFields';
import FormAction from '../App/FormAction';
import FormExtra from '../App/FormExtra';
import Input from '../App/Input';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = () => {
    const { email, password } = loginState;

    axios
      .post('http://localhost:5000/api/users/login', { email, password })
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) return res.data;
      })
      .then((data) => {
        console.log(data);
        //if (!data) console.error('Oh no! Tomomi! XC\n    ', data);
        console.log('Welcome back Fwuend! =-)');
        // document.cookie = `login=${data.user};`;
        window.location.href = '/home';
      })
      .catch((error) => console.error('Oh no! Tomomi! XC\n    ', error));
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className='-space-y-px'>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text='Login' />
    </form>
  );
}
