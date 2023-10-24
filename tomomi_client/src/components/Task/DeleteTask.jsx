import { useState } from 'react';
import { taskFields } from '../../constants/taskFields';
import FormAction from '../App/FormAction';
import Input from '../App/Input';

const fields = taskFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function DeleteTask() {
  const [deleteTaskState, setDeleteTaskState] = useState(fieldsState);

  const handleChange = (e) =>
    setDeleteTaskState({ ...deleteTaskState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(deleteTaskState);
    deleteTask();
  };

  const deleteTask = () => {
    const { userId } = deleteTaskState;
    fetch('/api/tasks/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //if (!data) console.error('Oh no! Tomomi! XC\n    ', data);
        console.log('Successfully deleted a Task! =-)');
        window.location.href = '/home';
      });
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={deleteTaskState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text='Delete Task' />
      </div>
    </form>
  );
}
