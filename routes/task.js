const express = require('express')
const taskRouter = express.Router()
const taskController = require('../controllers/task.controller')
const {check, query,  validationResult} = require('express-validator')

// task task?page=2 task?page=2&groupby=param
taskRouter.get('/task',
    [
        query('page', 'page errors').isInt({min: 1}).optional(),
        query('group', 'group errors').isInt({min: 1, max: 3}).optional()
    ],
    taskController.get)

taskRouter.get('/', taskController.get)

//articleRouter.get('/:id', articleController.getOne);
//articleRouter.post ('/', articleController.add);
//articleRouter.put('/:id', articleController.update);
//articleRouter.delete('/post/:id', articleController.delete);



module.exports = taskRouter