/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const express = require('express');
const AuthController  = require('../controllers/auth.controller');
const TasksController = require('../controllers/tasks.controller');

/**
 * userRoutes Adds UsrMan routes to the Server instance
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /api/tasks/get:
 *     get:
 *       summary: These are the tasks created so far... =-D
 *       description: Displays all tasks created by all Users.
 *       responses:
 *         200:
 *           description: Success! =-D
 *         404:
 *           description: No Tasks created yet... =-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.get('/get', (req, res) => {
  console.log('Getting Tasks for all Users... =-D');
  TasksController.getAllTasks(req, res)
    .then(() => {
      if (res.statusCode === 200) console.log('Success! =-D');
      else if (res.statusCode === 404) console.log('No Tasks created yet... =-[');
    })
    .catch((err) => {
      console.error(`Oh no! Tomomi! X(\n    ${err}`);
    });
});
/**
 * @swagger
 * paths:
 *   /api/tasks/get/{regId}:
 *     get:
 *       summary: These are the tasks created so far... =-D
 *       description: Displays all tasks created by all Users.
 *       parameters:
 *         -  in: path
 *            name: regId
 *            required: true
 *            schema:
 *              type: string
 *            description: User Id
 *       responses:
 *         200:
 *           description: Success! =-D
 *         404:
 *           description: No Tasks created yet... =-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.route('/get/:regId')
  .get((req, res) => {
    console.log(`Getting Task for User ${req.params.regId}... =-D`);
    TasksController.getTasksById(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Success! =-D');
        else if (res.statusCode === 404) console.log(`No Tasks for User ${req.params.regId}... =-[`);
      })
      .catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         taskName:
 *           type: string
 *         taskDesc:
 *           type: string
 *         taskPriority:
 *           type: string
 *           enum: [low, mid, high]
 *           default: low
 *         taskStatus:
 *           type: string
 *           enum: [to do, in progress, completed]
 *           default: to do
 *         taskLabels:
 *           type: array
 *           items:
 *             type: string
 *         userId:
 *           type: string
 * paths:
 *   /api/tasks/create/{regId}:
 *     post:
 *       summary: So...whatchu wanna do today? =-D
 *       parameters:
 *         -  in: path
 *            name: regId
 *            required: true
 *            schema:
 *              type: string
 *            description: User Id
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *         required: true
 *       responses:
 *         201:
 *           description: Joy! New Task! =-D
 *         401:
 *           description: Nay! No Task for you! >=-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.route('/create/:regId')
  .post((req, res) => {
    console.log(`Creating new Task for User ${req.params.regId}... =-D`);
    TasksController.createTask(req, res)
      .then(() => {
        if (res.statusCode === 201) console.log('Yay! New Task! =-D');
        else if (res.statusCode === 401) console.log('Nay! No task for you... >=-[');
      })
      .catch((err) => {
        console.error('Oh no! Tomomi!\n  ', err);
      });
});
/**
 * @swagger
 * paths:
 *   /api/tasks/update/{id}:
 *     patch:
 *       summary: So...whatchu wanna do differently? =-D
 *       parameters:
 *         -  in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Task Id
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *         required: true
 *       responses:
 *         200:
 *           description: Joy! New Task! =-D
 *         404:
 *           description: Nay! No Task for you! >=-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.route('/update/:id')
  .patch((req, res) => {
    console.log(`Updating a Task for User ${req.params.id}... =-D`);
    TasksController.getAllTasks(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Task updated! =-D');
        else if (res.statusCode === 404) console.log('That Task doesn\'t exist... =-[');
      })
      .catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});
/**
 * @swagger
 * paths:
 *   /api/tasks/delete/{id}:
 *     delete:
 *       summary: I see you don't wanna do that no more... =-)
 *       parameters:
 *         -  in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Task Id
 *       responses:
 *         200:
 *           description: Let's do something else then... =-D
 *         400:
 *           description: Delete failed... XC
 *         404:
 *           description: Uh, you haven\'t created that yet =-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.route('/delete/:id')
  .delete((req, res) => {
    console.log(`Ummm...deleting Task ${req.params.id}...`);
    TasksController.deleteTask(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Let\'s do something else then... =-D');
        if (res.statusCode === 400) console.log("Delete failed... XC");
        if (res.statusCode === 404) console.log("Uh, you haven\'t created that yet =-(");
        if (res.statusCode === 500) console.log('Oh no! Tomomi! X(');
      })
      .catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});

module.exports = router;
