const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const {check} = require('express-validator')

authRouter.post('/login',
    [
        check('login', 'wrong login format')
            .notEmpty()
            .isLength({min:5, max:20})
            .matches(/^([A-z_]*)$/),
        check('pass', 'wrong password format')
            .notEmpty(),
    ],
authController.login)
//authRouter.post ('/registration', authController.registration)
//authRouter.delete('/delete',authController.delete)
//authRouter.put('/update',authController.update)

module.exports = authRouter