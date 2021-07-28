const typeorm = require('typeorm')
const dateformat = require('dateformat')
const moment = require('moment')
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
        res.status(200).json(
            await typeorm.getRepository('Task').find({
                relations: ['responsible'],
                skip: (pageNum - 1) * 10,
                take: 10,
                order: {
                    updatedAt: "ASC"
                }
            })
        )
    }

    async function getSelfTasksByInterval(pageNum, grouping, lapse){
        switch(lapse) {
            case 'today':
                res.status(200).json(await typeorm.getRepository('Task').find({
                    relations: ['responsible'],
                    skip: (pageNum -1)*10,
                    take: 10,
                    where: {
                        responsible: 4, //useId
                        endingAt: dateformat(new Date(), 'yyyy-mm-dd'),
                    }
                })
                )
                break
            case 'week':
                const startOfWeek = moment().startOf('isoWeek').toDate();
                const endOfWeek = moment().endOf('isoWeek').toDate();
                res.status(200).json(
                    await typeorm.getRepository('Task').find({
                        relations: ['responsible'],
                        skip: (pageNum-1) * 10,
                        take: 10,
                        where: {
                            responsible: 2, //useId
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
                        relations: ['responsible'],
                        skip: (pageNum-1) * 10,
                        take: 10,
                        where: {
                            responsible: 2, //useId
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
                res.status(200).json(
                    await typeorm.getRepository('User').find({
                        relations: ['worker', 'worker.responsible'],
                        where: {
                            id: 1, // userId
                        }
                    })
                )
                break

            case 3:
                await getAllTasks(pageNum)
                break
        }
    }

    if(!validationResult(req).isEmpty())
        return res.status(400).json({message: 'bad querry params'}) //bad request error

    if (req.query['page'] && req.query['group'])
        return getGroupingTasks(Number(req.query['page']), Number(req.query['group']), req.query['lapse'])
    else if (req.query['page'])
        return getAllTasks(Number(req.query['page']))
    else if (req.query['group'])
        return getGroupingTasks(1, Number(req.query['group']), req.query['lapse'])
    else
        return getAllTasks(1,null,null)

}


exports.add = async (req, res) => {

}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}