const typeorm = require('typeorm')
const dateformat = require('dateformat')
const moment = require('moment')
const {LessThanOrEqual} = require("typeorm");
const {MoreThan} = require("typeorm");
const {Between} = require('typeorm')
const {validationResult} = require('express-validator')

// datetime YYYY-MM-DD hh:mm:ss
// date YYYY-MM-DD
// priority - 3 высокий, 2 средний, 1 низкий
// status - 4 к выполнению, 3 выполняется, 2 выполнено, 1 отменено

//1 self end date (today/week/all)
//2 owners
//3 all order by date
exports.get = async (req, res) => {

    async function getAllTasks(pageNum){
          const myObj =  await typeorm.getRepository('Task').find({
                relations: ['responsible', 'creator'],
                skip: (pageNum - 1) * 10,
                take: 10,
                order: {
                    updatedAt: "DESC"
                }
            })
        res.status(200).json(myObj)
    }

    async function getSelfTasksByInterval(pageNum, grouping, lapse){
        switch(lapse) {
            case 'today':
                res.status(200).json(await typeorm.getRepository('Task').find({
                    relations: ['responsible', 'creator'],
                    skip: (pageNum -1)*10,
                    take: 10,
                    where: {
                        responsible: req.user.userId,
                        endingAt: LessThanOrEqual(dateformat(new Date(), 'yyyy-mm-dd'))
                    }
                })
                )
                break
            case 'week':
                const startOfWeek = moment().startOf('isoWeek').toDate();
                const endOfWeek = moment().endOf('isoWeek').toDate();
                res.status(200).json(
                    await typeorm.getRepository('Task').find({
                        relations: ['responsible', 'creator'],
                        skip: (pageNum-1) * 10,
                        take: 10,
                        where: {
                            responsible: req.user.userId,
                            endingAt: Between(
                                dateformat(startOfWeek, 'yyyy-mm-dd'),
                                dateformat(endOfWeek, 'yyyy-mm-dd')
                            )
                        }
                    })
                )
                break
            case 'all':
                const startInterval = moment().endOf('isoWeek').toDate();
                res.status(200).json(
                    await typeorm.getRepository('Task').find({
                        relations: ['responsible', 'creator'],
                        skip: (pageNum-1) * 10,
                        take: 10,
                        where: {
                            responsible: req.user.userId,
                            endingAt: MoreThan(dateformat(startInterval, 'yyyy-mm-dd'))
                        }
                    })
                )
                break
            default:
                res.status(400).json({message:'bad request'})
        }
    }

    async function getGroupingTasks(pageNum, grouping, lapse) {
        switch(grouping){
            case 1:
                await getSelfTasksByInterval(pageNum, grouping, lapse)
                break
            case 2:
                const queryRes = await typeorm.getRepository('Task').createQueryBuilder('task')
                    .innerJoinAndSelect("task.creator", "creator")
                    .innerJoinAndSelect("task.responsible", "user")
                    .innerJoinAndSelect("user.owner", "owner")
                    .where("owner.id = :id", {id: req.user.userId})
                    .orderBy("user.firstName", "ASC")
                    .skip((pageNum-1) * 10)
                    .take(10)
                    .getMany()
                res.status(200).json(queryRes)
                break
            case 3:
                await getAllTasks(pageNum)
                break
        }
    }

    if(!validationResult(req).isEmpty())
        return res.status(400).json({message: 'bad query params'}) //bad request error

    if (req.query['page'] && req.query['group'])
        return getGroupingTasks(Number(req.query['page']), Number(req.query['group']), req.query['lapse'])
    else if (req.query['page'])
        return getAllTasks(Number(req.query['page']))
    else if (req.query['group'])
        return getGroupingTasks(1, Number(req.query['group']), req.query['lapse'])
    else
        return getAllTasks(1,null,null)

}

exports.getOne = async (req, res) =>{
    if(!validationResult(req).isEmpty())
        return res.status(400).json({message: 'bad querry params'}) //bad request error

    const myObj = await typeorm.getRepository('User').createQueryBuilder('user')
            .innerJoinAndSelect("user.owner", "owner")
            .where("owner.id = :id", {id: req.params.id})
            .getMany()
    res.status(200).json(myObj)

}

exports.save = async (req, res) => {
    if(!validationResult(req).isEmpty())
        res.status(400).json(validationResult(req)) //bad request error

    try {
        res.status(200).json(await typeorm.getRepository('Task').save
        ({
            ...req.body,
            createdAt: dateformat(new Date()),
            updatedAt: dateformat(new Date()),
        }))
    }
    catch (e) {
        console.log(e.message)
        res.status(500)// ?
    }
}

exports.delete = async (req, res) => {

}