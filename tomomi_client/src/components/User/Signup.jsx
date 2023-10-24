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
    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) res.json();
      })
      .then((data) => {
        console.log(data);
        //if (!data) console.error('Oh no! Tomomi! XC\n    ', data);
        console.log('Successful signup! =-)');
        window.location.href = '/';
      })
      .catch((err) => console.error('Oh no! Tomomi! XC\n    ', err));
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
