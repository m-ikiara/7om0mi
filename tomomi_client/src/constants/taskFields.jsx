export const taskFields = [
  {
    labelText: 'Task Name',
    labelFor: 'task-name',
    id: 'task-name',
    name: 'taskName',
    type: 'text',
    isRequired: true,
    placeholder: 'What do you want to do today?',
  },
  {
    labelText: 'Task Description',
    labelFor: 'task-description',
    id: 'task-description',
    name: 'taskDesc',
    type: 'textarea',
    placeholder: 'Add a brief description of the task',
  },
  {
    labelText: 'Task Priority',
    labelFor: 'task-priority',
    id: 'task-priority',
    name: 'taskPriority',
    type: 'select',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'mid', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
    defaultValue: 'low',
  },
  {
    labelText: 'Due Date',
    labelFor: 'due-date',
    id: 'due-date',
    name: 'dueDate',
    type: 'date',
  },
  /**
  {
    labelText: 'Assigned To',
    labelFor: 'assigned-to',
    id: 'assigned-to',
    name: 'userId',
    type: 'select',
    options: [
    ],
  },
  */
];
