const jwt = require('jsonwebtoken')
const config = require('config')

module.exports =  function(req, res, next) {
    const token = req.header('auth-token')

    if (!token)
        return res.redirect('/auth/login')

    jwt.verify(token, config.get('TOKEN_SECRET'), (err, data) => {
        if (err)
            return res.status(400).json({message: "failed to compare tokens"})
        else{
            req.user = data
            next()
        }
    })
}