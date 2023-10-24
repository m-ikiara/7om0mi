import { useState } from 'react';
import { taskFields } from '../../constants/taskFields';
import FormAction from '../App/FormAction';
import Input from '../App/Input';

const fields = taskFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function UpdateTask() {
  const [updateTaskState, setUpdateTaskState] = useState(fieldsState);

  const handleChange = (e) =>
    setUpdateTaskState({ ...updateTaskState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateTaskState);
    updateTask();
  };

  const updateTask = () => {
    const { taskName, taskDesc, taskPriority, dueDate } = updateTaskState;
    fetch('/api/tasks/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName,
        taskDesc,
        taskPriority,
        dueDate,
      }),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
        //if (!data) console.error('Oh no! Tomomi! XC\n    ', data);
        console.log('Successfully updated a Task! =-)');
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
            value={updateTaskState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text='Update Task' />
      </div>
    </form>
  );
}
