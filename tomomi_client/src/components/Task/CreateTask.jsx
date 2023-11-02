import axios from 'axios';
import { useState } from 'react';
import { taskFields } from '../../constants/taskFields';
import FormAction from '../App/FormAction';
import Input from '../App/Input';

const fields = taskFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function CreateTask() {
  const [createTaskState, setCreateTaskState] = useState(fieldsState);

  const handleChange = (e) => {
    setCreateTaskState({ ...createTaskState, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(createTaskState);
    createTask();
  };

  const createTask = () => {
    const { taskName, taskDesc, taskPriority, dueDate } = createTaskState;
    axios
      .post('http://localhost:5000/api/tasks/create', {
        taskName,
        taskDesc,
        taskPriority,
        dueDate,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.data;
      })
      .then((data) => {
        console.log(data);
        console.log('Joy! New Task! =-D');
        window.location.href = '/home';
      })
      .catch((err) => console.error('Oh no! Tomomi! XC\n', err));
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={createTaskState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text='Create Task' />
      </div>
    </form>
  );
}
