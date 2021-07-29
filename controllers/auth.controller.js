const typeorm = require('typeorm')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

exports.login = async (req, res) => {
    if(!validationResult(req).isEmpty())
        return res.status(400).json({message: 'bad request'})

    const result = await typeorm.getRepository('User').findOne({login: req.body.login})

    if (!result)
        return res.status(404).json({message: 'no user found'})

    await bcrypt.compare(req.body.password, result.password, (error, match) => {
        if (error)
            return res.status(500).json(error)

        else if (match){
            const token = jwt.sign({
                userFirstName: result.firstName,
                userMiddleName: result.middleName,
                userSecondName: result.secondName,
                userId: result.id
            },
                config.get('TOKEN_SECRET'),
                {
                    expiresIn: '1h'
                })
            return res.header('auth-token', token).status(200).json(token)
        }
        else
            return res.status(403).json({message: 'invalid password'});
    })
}
//
// exports.registration = async (req,res) => {
//
// }
//
// exports.delete = async(req, res)=>{
//
// }
//
// exports.update = async(req, res) =>{
//
// }
