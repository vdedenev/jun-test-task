const typeorm = require('typeorm')
const bcrypt = require('bcrypt')
const config = require('config')
const {validationResult} = require('express-validator')

// auth/login
exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json(errors)

    const result = await typeorm.getRepository('User').findOne({login: req.body.login})

    if (!result)
        return res.status(404).json({message: 'no user found'})

    await bcrypt.compare(req.body.password, result.password, (error, match) => {
        if (error)
            return res.status(500).json(error)
        else if (match)
            return res.status(200); // send token
        else
            return res.status(403).json({message: 'invalid password'});
    })
}

exports.registration = async (req,res) => {

}

exports.delete = async(req, res)=>{

}

exports.update = async(req, res) =>{

}
