const express = require('express')
const taskRouter = express.Router()
const taskController = require('../controllers/task.controller')
const {check, query} = require('express-validator')
const verifyToken = require('./verifyToken')

taskRouter.get('/task',
    [
        verifyToken,
        query('page', 'page errors').isInt({min: 1}).optional(),
        query('grouping', 'group errors').toLowerCase().isIn(['self', 'subordinate', 'all']).optional(),
        query('lapse', 'lapse errors').toLowerCase().isIn(['today', 'thisweek', 'nextweek']).optional()
    ],
    taskController.get)

taskRouter.get('/', verifyToken, taskController.get)
taskRouter.post('/task/save', [
    verifyToken,
    query('id', 'ids errors').optional().isInt({min: 1}),
    check('title', 'title errors').notEmpty(),
    check('description', 'description errors').notEmpty(),
    check('endingAt', 'end date errors').notEmpty(),
    check('priority', 'priority errors').notEmpty(),
    check('status', 'status errors').notEmpty(),
    check('creator', 'creator errors').notEmpty(),
    check('responsible', 'responsible errors').notEmpty(),
], taskController.save);

module.exports = taskRouter