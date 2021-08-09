const typeorm = require('typeorm')
const {validationResult} = require('express-validator')

exports.getOne = async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({message: 'bad query params'}) //bad request error

    const myObj = await typeorm.getRepository('User').createQueryBuilder('user')
        .innerJoinAndSelect("user.owner", "owner")
        .where("owner.id = :id", {id: req.params.id})
        .getMany()
    res.status(200).json(myObj)

}