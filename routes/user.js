const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const {check} = require('express-validator')
const verifyToken = require('./verifyToken')

userRouter.get('/:id', [
        verifyToken,
        check('id', 'param errors').isInt({min: 1}).notEmpty(),
    ],
    userController.getOne);

module.exports = userRouter