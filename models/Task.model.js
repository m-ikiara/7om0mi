/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const mongoose = require('mongoose');

/**
 * taskSchema Represents a Task.
 *
 * @typedef {Object} Task
 * @property {string} taskName - Task's Name. This field is required.
 * @property {string} taskDesc - Task's description.
 * @property {string} taskPriority - Task priority. This field is required.
 * @property {string} taskStatus - Task's status.
 * @property {Array<string>} taskLabels - Task's tags.
 * @property {number} estimatedTime - ETA for the task.
 * @property {number} actualTime - Time taken for completion.
 * @property {Date} dueDate - Time for Task completion.
 * @property {string} userId - User that created the task. This field is required
 * @property {Array<string>} subTasks - Tasks that depend on taskName.
 */
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [
      true,
      'What do you wanna do today? =-)',
    ],
  },
  taskDesc: {
    type: String,
  },
  taskPriority: {
    type: String,
    enum: [
      'low',
      'mid',
      'high',
    ],
  },
  taskStatus: {
    type: String,
    enum: [
      'to do',
      'in progress',
      'completed',
    ],
    default: 'to do',
  },
  taskLabels: {
    type: [String],
  },
  estimatedTime: {
    type: Number,
  },
  actualTime: {
    type: Number,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: [
      true,
      'Did you create this? =-(',
    ],
  },
  subTasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Task',
  },
});

/**
 * the Task model.
 * @class
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
