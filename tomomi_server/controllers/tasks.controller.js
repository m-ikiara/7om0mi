/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const Task = require('../models/Task.model');
/**
 * TasksController handles Tomomi's TaskMan functionality.
 * @typedef {Object} TasksController
 */
const TasksController = {
  /**
   * createTask Allows User to create a Task.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async createTask(req, res) {
    console.log('Received User: ', req.params.regId);
    if (!(await Task.findOne({ userId: req.params.regId }))) {
      await Task.create(req.body).then((task) => {
        if (!task) res.status(403).json({ error: 'Pretty sure you can\'t do that... >:-[' });
        res.status(201).json({
          task,
          msg: 'Joy! New Task! =-D',
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! X(\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
    }
  },
  /**
   * getAllTasks Retrieves all Tasks created.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async getAllTasks(req, res) {
    await Task.find({})
      .exec()
      .then((tasks) => {
        if (!tasks) res.status(404).json({ error: 'No Tasks created yet... =-(' });
        res.status(200).json({
          total: tasks.length,
          tasks: tasks.map((task) => {
            const taskObj = {};
            Object.keys(Task.schema.paths).forEach((taskField) => {
              taskObj[taskField] = task[taskField];
            });
            return taskObj;
          }),
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! X(\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
  /**
   * getTasksById Retrieves a Task created by a User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async getTasksById(req, res) {
    console.log('Received User: ', req.params.regId);
    const task = await Task.findOne({ userId: req.params.regId })
      .exec()
      .catch((err) => {
        res.status(404).json({ msg: 'Uh, you haven\'t created that yet =-(' });
        return null;
      });
    if (task) {
      res.status(200).json({
        user: req.params.regId,
        task,
      });
    }
  },
  /**
   * updateTask Allows User to update their Task.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async updateTask(req, res) {
    console.log('Received Task: ', req.params.id);
    await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
      .then((task) => {
        if (!task) res.status(404).json({ msg: 'Uh, you haven\'t created that yet =-(' });
        res.status(200).json({
          task: task._id,
          updatedTo: task,
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! XC\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
  /**
   * deleteTask Allows User to delete a Task.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async deleteTask(req, res) {
    console.log('Received User: ', req.params.id);
    await Task.deleteOne({ _id: req.params.id })
      .exec()
      .then((task) => {
        if (!task) res.status(404).json({ msg: 'Uh, you haven\'t created that yet =-(' });
        if (task.deletedCount !== 1) res.status(400).json({ error: 'Delete failed... XC' });
        res.status(200).json({
          task,
          msg: 'I see you don\'t wanna do that no more... =-O',
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! XC\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
};

module.exports = TasksController;
