import axios from 'axios';
import { useState } from 'react';
import { signupFields } from '../../constants/signupFields';
import FormAction from '../App/FormAction';
import Input from '../App/Input';

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = () => {
    const { username, email, password } = signupState;
    axios
      .post('http://localhost:5000/api/users/register', { username, email, password })
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) return res.data;
      })
      .then((data) => {
        console.log(data);
        console.log('Yay! New Fwuend! =-D');
        window.location.href = '/';
      })
      .catch((err) => console.error('Oh no! Tomomi! X(\n', err));
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text='Signup' />
      </div>
    </form>
  );
}
