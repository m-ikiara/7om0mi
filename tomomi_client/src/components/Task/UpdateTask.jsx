import axios from 'axios';
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

  const updateTask = (id) => {
    const { taskName, taskDesc, taskPriority, dueDate } = updateTaskState;
    axios.patch('http://localhost:5000/api/tasks/update' + id,  {
        taskName,
        taskDesc,
        taskPriority,
        dueDate,
    })
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) return res.data;
      })
      .then((data) => {
        console.log(data);
        //if (!data) console.error('Oh no! Tomomi! XC\n    ', data);
        console.log('Task updated! =-D');
        window.location.href = '/home';
      }).catch((err) => console.error('Oh no! Tomomi! XC', err);
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
