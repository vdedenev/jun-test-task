const typeorm = require('typeorm')
const bcrypt = require('bcrypt')
const config = require('config')

const sR = config.get('saltRounds')

/*
log = pass

ivanov_ivan,
petrov_petr,
sidorov_sidr,
semenov_semen,
sergeev_sergey,
vasiliev_vasiliy
 */
const dataArr = [
    {firstName: 'Иванов', secondName: 'Иван', middleName: 'Иванович', login: 'ivanov_ivan',
        password: bcrypt.hashSync('ivanov_ivan', sR), owner: null},
    {firstName: 'Петров', secondName: 'Петр', middleName: 'Петрович', login: 'petrov_petr',
        password: bcrypt.hashSync('petrov_petr', sR), owner: 1},
    {firstName: 'Сидоров', secondName: 'Сидр', middleName: 'Сидорович', login: 'sidorov_sidr',
        password: bcrypt.hashSync('sidorov_sidr', sR), owner: null},
    {firstName: 'Семенов', secondName: 'Семен', middleName: 'Семенович', login: 'semenov_semen',
        password: bcrypt.hashSync('semenov_semen', sR), owner: 3},
    {firstName: 'Сергеев', secondName: 'Сергей', middleName: 'Сергеевич', login: 'sergeev_sergey',
        password: bcrypt.hashSync('sergeev_sergey', sR), owner: null},
    {firstName: 'Васильев', secondName: 'Василий', middleName: 'Васильевич', login: 'vasiliev_vasiliy',
        password: bcrypt.hashSync('vasiliev_vasiliy', sR), owner: 1},
]

async function insert() {
    try {
        await typeorm.createConnection()
    }
    catch (e) {
        throw e.message
    }

    await typeorm.getRepository('User').save(dataArr);
    console.log('--User insert successful--')

    process.exit()
}

insert()