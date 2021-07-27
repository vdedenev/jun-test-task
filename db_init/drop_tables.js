const typeorm = require('typeorm')

async function dropTables() {
    try {
        await typeorm.createConnection()
    }
    catch (e) {
        throw e.message
    }

    await typeorm.getRepository('User').query("drop table if exists Task")
    await typeorm.getRepository('User').query("drop table if exists User")
    console.log('--tables dropped successful--')

    process.exit()
}

dropTables()

