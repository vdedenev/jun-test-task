const jwt = require('jsonwebtoken')
const config = require('config')

module.exports =  function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token)
            return res.redirect('/auth/login')

        jwt.verify(token, config.get('TOKEN_SECRET'), (err, data) => {
            if (err)
                return res.status(400).json({message: "failed to compare tokens"})
            else {
                req.user = data
                next()
            }
        })
    } catch (e){
        return res.status(401).json({message:"smthng going wrong"})
    }
}