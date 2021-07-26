const express =  require('express')
const config = require('config')
const typeorm = require('typeorm')

const app = express()

const PORT = config.get('port')

async function start(){
    try{
        await typeorm.createConnection()
        console.log("db connected")
    }
    catch (e) {
        throw e.message
    }
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
}

start()
