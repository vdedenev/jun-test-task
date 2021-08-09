const typeorm = require('typeorm')

// datetime YYYY-MM-DD hh:mm:ss
// date YYYY-MM-DD
// priority - 3 высокий, 2 средний, 1 низкий
// status - 4 к выполнению, 3 выполняется, 2 выполнено, 1 отменено

const dataArr = [
    {title: 'Задача1', description: 'Описание задачи 1.Описание задачи 1', createdAt: '2021-07-27 12:00:00',
        updatedAt: '2021-07-27 12:00:00', endingAt: '2021-08-01', priority: 'high', status: 'inProgress',creator: 1, responsible: 2},
    {title: 'Задача2', description: 'Описание задачи 2.Описание задачи 2', createdAt: '2021-07-27 15:00:00',
        updatedAt: '2021-07-28 15:00:00', endingAt: '2021-08-05', priority: 'low', status: 'toImplementation',creator: 2, responsible: 2},
    {title: 'Задача3', description: 'Описание задачи 3.Описание задачи 3', createdAt: '2021-07-25 21:00:00',
        updatedAt: '2021-05-28 21:00:00', endingAt: '2021-07-28', priority: 'medium', status: 'completed',creator: 3, responsible: 4},
    {title: 'Задача4', description: 'Описание задачи 4.Описание задачи 4', createdAt: '2021-07-22 11:00:00',
        updatedAt: '2021-08-28 21:00:00', endingAt: '2021-07-27', priority: 'high', status: 'canceled',creator: 4, responsible: 4},
    {title: 'Задача5', description: 'Описание задачи 5.Описание задачи 5', createdAt: '2021-07-22 23:00:00',
        updatedAt: '2021-07-22 23:00:00', endingAt: '2021-07-29', priority: 'high', status: 'inProgress',creator: 1, responsible: 6},
    {title: 'Задача6', description: 'Описание задачи 6.Описание задачи 6', createdAt: '2021-07-22 14:35:00',
        updatedAt: '2021-07-22 14:35:00', endingAt: '2021-07-26', priority: 'medium', status: 'inProgress',creator: 6, responsible: 6},
]

async function insert() {
    try {
        await typeorm.createConnection()
    }
    catch (e) {
        throw e.message
    }
    await typeorm.getRepository('Task').query("SET FOREIGN_KEY_CHECKS = 0")
    await typeorm.getRepository('Task').save(dataArr);
    console.log('--Task insert successful--')

    process.exit()
}

insert()

