import { useState } from 'react';
import { taskFields } from '../../constants/taskFields';
import FormAction from '../App/FormAction';
import Input from '../App/Input';

const fields = taskFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function TaskMan() {
  const [createTaskState, setCreateTaskState] = useState(fieldsState);

  const handleChange = (e) => {
    setCreateTaskState({ ...createTaskState, [e.target.id]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(createTaskState);
    createTask();
  };

  const createTask = () => {
    const { taskName, taskDesc, taskPriority, dueDate } = createTaskState;
    fetch('/api/tasks/create', {
      method: 'POST',
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
        console.log('Successfully created a Task! =-)');
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
