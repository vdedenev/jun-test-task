const typeorm = require('typeorm')
const {validationResult} = require('express-validator')

// datetime YYYY-MM-DD hh:mm:ss
// date YYYY-MM-DD
// priority - 3 высокий, 2 средний, 1 низкий
// status - 4 к выполнению, 3 выполняется, 2 выполнено, 1 отменено

exports.getAll = async (req,res) =>{
    const result = await typeorm.getRepository('Task').createQueryBuilder()
        .take(10)
        .getMany()
    return res.status(200).json(result)
}

//1 self end date (today/week/all)
//2 owners
//3 all order by date
exports.get = async (req, res) => {
    async function allFilters(pageNum, grouping, lapse) {
        if (req.query['lapse'] === 'today')
        {
            // const result = await typeorm.getRepository('Task').createQueryBuilder()
            //     .leftJoinAndSelect("task.responsible", "User")
            //     .where("task.responsible = :resp and task.endingAt = :endDate",
            //         {resp: 4, endDate: Date.now()})
            //     .skip(pageNum*10)
            //     .take(10)
            //     .getMany()
            // return res.status(200).json(result);
        }
    }

    if (req.query['page'] && req.query['group'])
    {
        if(!validationResult(req).isEmpty())
            return res.redirect('../404')



        if (req.query['group'] === '1')
            if (req.query['lapse'] === 'today' || req.query['lapse'] === 'week' || req.query['lapse'] === 'all')
                await allFilters(req.query['page'],req.query['group'], req.query['lapse'])
            else
                return res.redirect('../404')
        else if (req.query['group'] === '2')
        {
            const result = await typeorm.getRepository('User').find({
                relations: ['workers'],
                where: {
                     id : 2
                 }
            })
            return res.status(200).json(result)
        }






    }


    else return res.status(200).json({message:"done"})
    // if (/\*(page=\d{2,})\*/.test(req.query) && req.query['groupby']) {
    //     // const result = await typeorm.getRepository('Task').find(
    //     //     {
    //     //         relations
    //     //     }
    //     // )
    //
    //     return res.status(200).json({page: req.query['page'], groupby: req.query['groupby']})
    // }
    // else if (req.query['page']){
    //     if(req.query['page'] === 1)
    //         return res.redirect('/task');
    //
    //     const result = await typeorm.getRepository('Task').createQueryBuilder()
    //         .skip(req.page['page']*10)
    //         .take(10)
    //         .getMany()
    //     return res.status(200).json(result)
    // }
    // else if (req.query['groupby']) {
    //     return res.status(200).json({groupby: req.query['groupby']})
    // }
    // else {
    //     return res.status(200).json({message: 'no page, no groupby'})
    // }

    // const result = await typeorm.getRepository('Article').find({
    //     relations: ['rubric'],
    //     where: {
    //         rubric: {
    //             id: req.query.rubric_id
    //         }
    //     }
    // })
    // if (Object.keys(result).length === 0)
    //     res.status(403).json({message: 'no results found'});
    // else
    //     res.status(200).json(result); //!
}


exports.add = async (req, res) => {

}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}