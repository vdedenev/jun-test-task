const express = require('express')
const taskRouter = express.Router()
const taskController = require('../controllers/task.controller')
const {check, query} = require('express-validator')
const verifyToken = require('./verifyToken')

taskRouter.get('/task',
    [
        verifyToken,
        query('page', 'page errors').isInt({min: 1}).optional(),
        query('group', 'group errors').isInt({min: 1, max: 3}).optional()
    ],
    taskController.get)

taskRouter.get('/', verifyToken, taskController.get)
taskRouter.post ('/task/add', verifyToken, taskController.add);

taskRouter.get('/user/:id', [
        verifyToken,
        check('id', 'param errors').isInt({min: 1}).notEmpty(),
    ],
taskController.getOne);
//taskRouter.put('/:id', taskRouter.update);
//taskRouter.delete('/post/:id', taskRouter.delete);



module.exports = taskRouter