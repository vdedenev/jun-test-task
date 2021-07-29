const typeorm = require('typeorm')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

exports.login = async (req, res) => {
    if(!validationResult(req).isEmpty())
        return res.status(400).json({message: 'wrong login\\password format'})

    const result = await typeorm.getRepository('User').findOne({login: req.body.login})

    if (!result)
        return res.status(400).json({message: 'no user found'})

    await bcrypt.compare(req.body.pass, result.password, (error, match) => {
        if (error)
            return res.status(500).json(error)

        else if (match){
            const token = jwt.sign({
                userId: result.id
            },
                config.get('TOKEN_SECRET'),
                {
                    expiresIn: '1h'
                })
            return res.status(200).json({
                token,
                userId: result.id,
                userName: result.secondName,
                userMiddleName: result.middleName
            })
        }
        else
            return res.status(400).json({message: 'invalid password'});
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
