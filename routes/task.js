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

//articleRouter.get('/:id', articleController.getOne);
//articleRouter.post ('/', articleController.add);
//articleRouter.put('/:id', articleController.update);
//articleRouter.delete('/post/:id', articleController.delete);



module.exports = taskRouter